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

// To get user data
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return; // exit  (no valid obj)
    // QueryReference > document reference
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // QuerySnapshot > get document snapshot
    const snapShot = await userRef.get();
    // check if user data exist
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            // create snapShot - create a new user if not exist
            await userRef.set({ displayName, email, createdAt, ...additionalData })
        }catch(err){
            console.log('error creating user', err.message);
        }
    }
    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google auth provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;