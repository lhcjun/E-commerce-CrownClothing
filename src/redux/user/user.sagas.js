import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from "./user.actions";

// actually sign in
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // get document reference (user data) back from firebase.utils
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    //  Get user actual data (snapShot)
    const userSnapshot = yield userRef.get();
    // dispatch new action > success - sign in
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    // destructor out  userAuth obj from return value
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    // destructor out userAuth obj from return value
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// check if user has signed in
export function* isUserAuthenticated() {
  try {
    // get userAuth obj from getCurrentUser
    const userAuth = yield getCurrentUser();
    if (!userAuth) return; // not sign in > exit
    // if userAuth obj > sign in
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

// To sign out
export function* signOut(){
    try{
        yield auth.signOut();
        // dispatch new action > sign out
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error));
    }
}

// To sign up
export function* signUp({ payload: { email, password, displayName } }){
  try{
    // create new user
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // parameter > userAuth, additionalData 
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  }catch(error){
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }){
  yield getSnapshotFromUserAuth(user, additionalData);
}


// base saga - google sign in
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_PENDING, signInWithGoogle);
}

// base saga - email sign in
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_PENDING, signInWithEmail);
}

// base saga - persist user sign in
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// base saga - sign out
export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_PENDING, signOut);
}

// base saga - sign up
export function* onSignUpStart(){
  yield takeLatest(UserActionTypes.SIGN_UP_PENDING, signUp);
}

export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS,signInAfterSignUp)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
