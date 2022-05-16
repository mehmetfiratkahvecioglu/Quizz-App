import React, {useState} from 'react';
import {SafeAreaView, Text, View, Alert} from 'react-native';
import styles from './SignInScreen.style';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';
import {signIn} from '../../utils/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = () => {
    if (email === '' || password === '') {
      alert('Please enter your email and password');
    }
    if (email != '' && password != '') {
      //sing in
      signIn(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Header */}
        <Text style={styles.header}>SignIn Screen</Text>

        {/* email */}
        <FormInput
          labelText="Email"
          placeholderText="Email"
          onchangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        {/* password */}
        <FormInput
          labelText="Password"
          placeholderText="Password"
          onchangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />

        {/* SignIn button */}
        <FormButton labelText="Sign In" handleOnPress={handleOnSubmit} />

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          <Text>Hesabınız yok mu ?</Text>
          <Text
            style={{
              color: 'blue',
              marginLeft: 5,
            }}
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            Hesap Yarat.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;