import {View, Text, TextInput} from 'react-native';
import React from 'react';

const FormInput = ({
  placeholderText = '',
  onchangeText = () => {},
  value = '',
  ...more
}) => {
  return (
    <View>
      <TextInput
        style={{
          padding: 10,
          height: 40,
          borderColor: 'gray',
          borderWidth: 2,
          minWidth: '80%',
          borderRadius: 10,
          margin: 5,
        }}
        placeholder={placeholderText}
        onChangeText={onchangeText}
        value={value}
        autoCapitalize="none"
        {...more}
      />
    </View>
  );
};

export default FormInput;
