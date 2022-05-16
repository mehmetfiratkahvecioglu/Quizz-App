import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import AuthStackNavigator from './Navigation/AuthStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AppStackNavigator from './Navigation/AppStackNavigator';
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged = async user => {
    await setCurrentUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {currentUser ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default App;
