import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAUg7byYFBQpqxY2LhAjYeIo-6GcttuU7g",
    authDomain: "crwn-db-9e20e.firebaseapp.com",
    databaseURL: "https://crwn-db-9e20e.firebaseio.com",
    projectId: "crwn-db-9e20e",
    storageBucket: "crwn-db-9e20e.appspot.com",
    messagingSenderId: "608014898428",
    appId: "1:608014898428:web:064879518ef426d336f379",
    measurementId: "G-8FGK6JNDJF"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google auth provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;