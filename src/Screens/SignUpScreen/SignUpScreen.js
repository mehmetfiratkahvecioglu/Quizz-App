import {SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import styles from './SignUpScreen.style';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';
import {signUp} from '../../utils/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      alert('Please enter your email and password');
    }
    if (email != '' && password != '' && confirmPassword != '') {
      if (password === confirmPassword) {
        //sign up
        signUp(email, password);
      } else {
        alert('Parolalar eşleşmiyor');
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <FontAwesome5
        name="user-plus"
        size={135}
        color="#3d5afe"
        style={{marginLeft: 50, marginTop: 20, marginBottom: 20}}
      />

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
      {/* confirm password */}
      <FormInput
        labelText="Password Confirm"
        placeholderText="Password again"
        onchangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry={true}
      />
      {/* SignUp button */}
      <FormButton labelText="Sign UP" handleOnPress={handleSignUp} />

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <Text>Zaten hesabınız var mı ?</Text>
        <Text
          style={{
            color: '#3d5afe',
            marginLeft: 5,
          }}
          onPress={() => {
            navigation.navigate('SignIn');
          }}>
          Giriş yap.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
