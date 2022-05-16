import {View, Modal, Text} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ResultModal = ({
  isModalVisible,
  correctCount,
  inCorrectCount,
  totalCount,
  handleOnClose,
  handleRetry,
  handleHome,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 28, color: 'black'}}>RESULTS</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{fontSize: 30, color: 'green'}}>{correctCount}</Text>
              <Text style={{fontSize: 16}}>Correct</Text>
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
              <Text style={{fontSize: 30, color: 'red'}}>{inCorrectCount}</Text>
              <Text style={{fontSize: 16}}>Incorrect</Text>
            </View>
          </View>

          <Text style={{opacity: 0.5}}>
            {totalCount - (inCorrectCount + correctCount)} Unattempted
          </Text>
          {/* try again button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              width: 200,
              backgroundColor: 'black',
              margin: 5,
              borderRadius: 10,
            }}
            onPress={handleRetry}>
            <MaterialIcons name="replay" size={40} color="white" />
            <Text style={{color: 'white'}}>Try again</Text>
          </TouchableOpacity>
          {/* go home button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              width: 200,
              backgroundColor: 'gray',
              margin: 5,
              borderRadius: 10,
            }}
            onPress={handleHome}>
            <MaterialIcons name="home" size={40} color="white" />
            <Text style={{color: 'white'}}>Go Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
