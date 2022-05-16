import {SafeAreaView, Text} from 'react-native';
import React, {useState} from 'react';
import FormInput from '../../components/shared/FormInput';
import FormButton from '../../components/shared/FormButton';
import {createQuiz} from '../../utils/database';

const CreateQuizScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 90000).toString();
    await createQuiz(currentQuizId, title, description);

    navigation.navigate('AddQuestion', {
      currentQuizId: currentQuizId,
      currentQuizTitle: title,
    });

    setTitle('');
    setDescription('');
    alert('Quiz created successfully!');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FormInput
        placeholderText="Title"
        onchangeText={setTitle}
        value={title}
      />
      <FormInput
        placeholderText="Description"
        onchangeText={setDescription}
        value={description}
      />
      <FormButton labelText="Save" handleOnPress={handleQuizSave} />
      {/*  geçici buton  bu buton geçici olup sürekli quiz oluşturmada n aynı quize soru eklemeyi  sağlıyor.
      <FormButton
        labelText="go to addquestion"
        handleOnPress={() =>
          navigation.navigate('AddQuestion', {
            currentQuizId: '131150',
            currentQuizTitle: 'demotitle',
          })
        }
      />
        */}
    </SafeAreaView>
  );
};

export default CreateQuizScreen;
