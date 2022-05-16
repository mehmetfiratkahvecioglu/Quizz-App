import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const FormButton = ({
  labelText = '',
  handleOnPress = () => {},
  style = style,
  ...more
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Text style={styles.title}>{labelText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default FormButton;
