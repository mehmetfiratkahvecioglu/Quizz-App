import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getQuizById, getQuestionsByQuizId} from '../../utils/database';
import styles from './PlayQuizScreen.style.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FlatList} from 'react-native-gesture-handler';
import FormButton from '../../components/shared/FormButton';
import ResultModal from '../../components/ResultModal';
const PlayQuizScreen = ({navigation, route}) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const getQuizAndQuestionsDetails = async () => {
    //get quiz
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);
    //get questions for current quiz
    const questions = await getQuestionsByQuizId(currentQuizId);
    console.log('sorular', questions);
    //transform and shuffle options
    let tempQuestions = [];
    await questions.docs.forEach(async res => {
      let question = res.data();
      // create single array of options and shuffle it
      question.allOptions = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      await tempQuestions.push(question);
    });
    setQuestions([...tempQuestions]);
  };

  useEffect(() => {
    getQuizAndQuestionsDetails();
  }, []);

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return '#00ff00';
        } else {
          return '#ff0000';
        }
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}

      <View style={styles.topBarView}>
        {/* Back button */}
        <MaterialIcons
          name="arrow-back"
          size={30}
          color="black"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        {/* title */}
        <Text style={styles.title}>{title}</Text>
        {/* correct and incorrect count */}
        <View style={styles.scoreTable}>
          {/*Corect count */}
          <View style={styles.correctcount}>
            <MaterialIcons name="check" size={15} color="white" />
            <Text style={{color: 'white', marginLeft: 4}}>{correctCount}</Text>
          </View>
          {/* incorrect count */}
          <View style={styles.incorrectcount}>
            <AntDesign name="close" size={15} color="white" />
            <Text style={{color: 'white', marginLeft: 4}}>
              {incorrectCount}
            </Text>
          </View>
        </View>
      </View>

      {/* questiions and options list */}
      <FlatList
        data={questions}
        style={{flex: 1, backgroundColor: 'white', marginTop: 10}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
        renderItem={({item, index}) => (
          <View
            style={{
              marginTop: 14,
              marginHorizontal: 10,
              backgroundColor: 'white',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.7,
              elevation: 1,
              borderRadius: 10,
            }}>
            <View style={{padding: 20}}>
              <Text style={{fontSize: 16}}>
                {index + 1}. {item.question}
              </Text>

              {item.imageUrl != '' ? (
                <Image
                  source={{uri: item.imageUrl}}
                  resizeMode="cover"
                  style={{
                    width: 280,
                    height: 150,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              ) : null}
            </View>
            {/* options */}
            {item.allOptions.map((option, optionIndex) => {
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    borderTopColor: '#e6e6e6',
                    backgroundColor: getOptionBgColor(item, option),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => {
                    if (item.selectedOption) {
                      return null;
                    }
                    //increase correct/incorrect count
                    if (option == item.correct_answer) {
                      setCorrectCount(correctCount + 1);
                    } else {
                      setIncorrectCount(incorrectCount + 1);
                    }
                    let tempQuestions = [...questions];
                    tempQuestions[index].selectedOption = option;
                    setQuestions([...tempQuestions]);
                  }}>
                  <Text>{optionIndex + 1}) </Text>
                  <Text>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Submit"
            handleOnPress={() => {
              //show result modal
              setIsResultModalVisible(true);
            }}
          />
        )}
      />
      {/*result modal */}
      <ResultModal
        isModalVisible={isResultModalVisible}
        correctCount={correctCount}
        inCorrectCount={incorrectCount}
        totalCount={questions.length}
        handleOnClose={() => {
          setIsResultModalVisible(false);
        }}
        handleRetry={() => {
          setCorrectCount(0);
          setIncorrectCount(0);
          getQuizAndQuestionsDetails();
          setIsResultModalVisible(false);
        }}
        handleHome={() => {
          navigation.navigate('Home');
          setIsResultModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default PlayQuizScreen;
