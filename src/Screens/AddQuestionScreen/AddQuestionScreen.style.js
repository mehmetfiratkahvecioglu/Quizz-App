import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  innerContainer: {flex: 1, backgroundColor: 'white'},
  viewContainer: {
    padding: 20,
    backgroundColor: 'white',
  },

  addImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default styles;
