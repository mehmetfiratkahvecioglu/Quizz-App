import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  topBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    backgroundColor: 'white',
    padding: 20,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  title: {fontSize: 20, fontWeight: 'bold', color: '#3d5afe'},
});

export default styles;
