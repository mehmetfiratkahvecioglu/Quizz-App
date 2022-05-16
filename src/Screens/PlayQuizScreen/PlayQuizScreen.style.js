import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', position: 'relative'},
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
  scoreTable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  correctcount: {
    backgroundColor: '#00ff00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  incorrectcount: {
    backgroundColor: '#ff0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default styles;
