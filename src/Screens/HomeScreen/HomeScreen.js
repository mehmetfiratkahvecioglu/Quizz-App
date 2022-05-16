import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../../utils/auth';
import FormButton from '../../components/shared/FormButton';
import styles from './HomeScreen.style';
import {getQuizzes} from '../../utils/database';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllQuizzes = async () => {
    setRefreshing(true);
    const quizzes = await getQuizzes();

    console.log(quizzes);

    let tempQuizzes = [];
    await quizzes.docs.forEach(async quiz => {
      await tempQuizzes.push({
        id: quiz.id,
        ...quiz.data(),
      });
    });
    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  };

  useEffect(() => {
    getAllQuizzes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarView}>
        <Text style={styles.title}>Quizz App</Text>
        <Ionicons
          name="exit-outline"
          size={30}
          color="black"
          onPress={signOut}
        />
      </View>
      {/* Quizz LİST */}
      <FlatList
        data={allQuizzes}
        refreshing={refreshing}
        onRefresh={getAllQuizzes}
        showsVerticalScrollIndicator={false}
        style={{paddingVertical: 20}}
        renderItem={({item: quiz}) => (
          <View
            style={{
              padding: 20,
              borderRadius: 10,
              marginVertical: 5,
              marginHorizontal: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.7,
              elevation: 1,
            }}>
            <View style={{flex: 1, paddingRight: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                {quiz.title}
              </Text>
              {
                (quiz.description = !'' ? (
                  <Text style={{color: 'black', opacity: 0.7}}>
                    {quiz.description}
                  </Text>
                ) : null)
              }
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 20,
                backgroundColor: '#3d5afe',
              }}
              onPress={() => {
                navigation.navigate('PlayQuiz', {quizId: quiz.id});
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Play</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateQuiz')}
        style={{
          backgroundColor: '#3d5afe',
          position: 'absolute',
          bottom: 20,
          right: 10,
          borderRadius: 50,
          padding: 20,
        }}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          Create Quiz
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
