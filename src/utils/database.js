import firestore from '@react-native-firebase/firestore';

export const createQuiz = (currentQuizId, title, description) => {
  return firestore().collection('Quizzes').doc(currentQuizId).set({
    title,
    description,
  });
};

export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// get all quizzes

export const getQuizzes = () => {
  return firestore().collection('Quizzes').get();
};

// get quizId details by id
export const getQuizById = currentQuizId => {
  return firestore().collection('Quizzes').doc(currentQuizId).get();
};

// get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
  return firestore()
    .collection('Quizzes')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
}
