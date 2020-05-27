import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAUg7byYFBQpqxY2LhAjYeIo-6GcttuU7g",
  authDomain: "crwn-db-9e20e.firebaseapp.com",
  databaseURL: "https://crwn-db-9e20e.firebaseio.com",
  projectId: "crwn-db-9e20e",
  storageBucket: "crwn-db-9e20e.appspot.com",
  messagingSenderId: "608014898428",
  appId: "1:608014898428:web:064879518ef426d336f379",
  measurementId: "G-8FGK6JNDJF",
};

firebase.initializeApp(config);

// To get user data
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // exit  (no valid obj)
  // QueryReference > document reference
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // QuerySnapshot > get document snapshot
  const snapShot = await userRef.get();
  // check if user data exist
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // create snapShot - create a new user if not exist
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }
  return userRef;
};


// user sign in > get user's cart info / set new cart
export const getUserCartRef = async userId => {   // sign in success / currentUser
  // collection ref / snapshot (related info - ex. db path)
  const cartsRef = firestore.collection('carts').where('userId', '==', userId);
  const snapShot = await cartsRef.get();
  
  if(snapShot.empty) {
    // if no user's cart related info > set new cart to database
    const cartDocRef = firestore.collection('carts').doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  }else{
    // user's cart related info - ex. db path
    return snapShot.docs[0].ref;
  }
};


// Set value into firebase
export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
  // create new collection ref obj
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach( obj => {
    // create new document ref obj (in collection)  with unique id
    const newDocRef = collectionRef.doc();
    console.log(newDocRef);
    // set value with batch
    batch.set(newDocRef, obj); // in obj
  });
  // fire batch req  >  commit will return promise
  return await batch.commit();
};

// To get collections array data > convert to obj  (for data normalization)
export const convertCollectionsSnapshotToMap = collections => {
  /* Firestore return an Array of Obj on the docs inside CollectionsReference Snapshot
       => get docs array(5)(collections obj) in querySnapshot obj */
  const transformedCollection = collections.docs.map( doc => {
    // get actual data from each collection
    const { title, items } = doc.data();
    // return as obj (in array)
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  // convert array to obj
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // listen to login / logout event
    const unsubscribe = auth.onAuthStateChanged( userAuth => {
      unsubscribe();
      resolve(userAuth); // get updated userAuth obj
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google auth provider
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
