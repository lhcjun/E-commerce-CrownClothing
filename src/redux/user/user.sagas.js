import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure } from './user.actions';


// actually sign in
export function* getSnapshotFromUserAuth (userAuth) {
    try{
        // get document reference (user data) back from firebase.utils
        const userRef = yield call(createUserProfileDocument, userAuth)
        //  Get user actual data (snapShot)
        const userSnapshot = yield userRef.get();
        // dispatch new action > success - sign in
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle(){
    try{
        // destructor out  userAuth obj from return value
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error){
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }){
    try{
        // destructor out userAuth obj from return value
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error))
    }
}

// check if user has signed in
export function* isUserAuthenticated(){
    try{
        // 呼叫 getCurrentUser 並取回 userAuth obj
        // 這裡的 userAuth 跟上面的 { user } 是同一個 obj
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;  // not sign in > exit
        // 如果有 userAuth obj
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error));
    }
}

// base saga - google sign in
export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_PENDING, signInWithGoogle)
}

// base saga - email sign in
export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_PENDING, signInWithEmail)
}

// base saga - memorize user sign in
export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ])
}