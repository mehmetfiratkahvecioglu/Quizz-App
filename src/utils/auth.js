import auth from '@react-native-firebase/auth';

export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('sign in success');
    })
    .catch(error => {
      console.log('sign in error', error);
    });
};

export const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const signOut = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('User signed out!');
    })
    .catch(error => {
      console.error(error);
    });
};
