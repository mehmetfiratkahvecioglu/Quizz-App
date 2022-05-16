import {
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './AddQuestionScreen.style';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';
import {createQuestion} from '../../utils/database';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddQuestionScreen = ({navigation, route}) => {
  const [currentQuizId, setCurrentQuizId] = useState(
    route.params.currentQuizId,
  );
  const [currentQuizTitle, setCurrentQuizTitle] = useState(
    route.params.currentQuizTitle,
  );

  const [question, setQuestion] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [correctAnswer, setCorrectAnswer] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [optionFour, setOptionFour] = useState('');

  const handleQuestionSave = async () => {
    if (
      question === '' ||
      correctAnswer === '' ||
      optionTwo === '' ||
      optionThree === '' ||
      optionFour === ''
    ) {
      alert('Please fill all the fields');
      return;
    }

    let currentQuestionId = Math.floor(
      100000 + Math.random() * 9000,
    ).toString();
    // Upload image to firebase storage

    let imageUrl = '';

    if (imageUri != '') {
      const reference = storage().ref(
        `/images/questions/${currentQuizId}_${currentQuestionId}`,
      );

      await reference.putFile(imageUri).then(() => {
        console.log('uploaded successfully');
      });

      imageUrl = await reference.getDownloadURL();
    }

    //add question to db
    await createQuestion(currentQuizId, currentQuestionId, {
      question: question,
      correct_answer: correctAnswer,
      incorrect_answers: [optionTwo, optionThree, optionFour],
      imageUrl: imageUrl,
    });

    alert('Question added successfully');
    //reset
    setQuestion('');
    setCorrectAnswer('');
    setOptionTwo('');
    setOptionThree('');
    setOptionFour('');
    setImageUri('');
  };

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, ({assets}) => {
      if (assets && assets.length > 0) {
        setImageUri(assets[0].uri);
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.viewContainer}>
            <FormInput
              placeholderText="AddQuestion"
              onchangeText={val => setQuestion(val)}
              value={question}
            />
            {/* upload image */}
            {imageUri === '' ? (
              <TouchableOpacity
                style={styles.addImageView}
                onPress={selectImage}>
                <Text> + Add Image </Text>
              </TouchableOpacity>
            ) : (
              <Image
                source={{uri: imageUri}}
                resizeMode="cover"
                style={styles.image}
              />
            )}

            {/* options */}
            <FormInput
              placeholderText="Correct Answer "
              onchangeText={val => {
                setCorrectAnswer(val);
              }}
              value={correctAnswer}
            />
            <FormInput
              placeholderText="Option 2"
              onchangeText={val => {
                setOptionTwo(val);
              }}
              value={optionTwo}
            />
            <FormInput
              placeholderText="Option 3"
              onchangeText={val => {
                setOptionThree(val);
              }}
              value={optionThree}
            />
            <FormInput
              placeholderText="Option 4"
              onchangeText={val => {
                setOptionFour(val);
              }}
              value={optionFour}
            />
            <FormButton
              labelText="Add Question"
              handleOnPress={handleQuestionSave}
            />
            <FormButton
              labelText="Done Go Home"
              handleOnPress={() => {
                setCurrentQuizId('');
                navigation.navigate('Home');
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddQuestionScreen;
