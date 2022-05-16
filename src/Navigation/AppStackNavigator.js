import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import CreateQuizScreen from '../Screens/CreateQuizScreen';
import AddQuestion from '../Screens/AddQuestionScreen';
import PlayQuizScreen from '../Screens/PlayQuizScreen';
const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateQuiz" component={CreateQuizScreen} />
      <Stack.Screen name="AddQuestion" component={AddQuestion} />
      <Stack.Screen name="PlayQuiz" component={PlayQuizScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
