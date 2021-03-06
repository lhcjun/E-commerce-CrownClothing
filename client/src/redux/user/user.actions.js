import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_PENDING
});

export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_PENDING,
    payload:　emailAndPassword
});

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error.code
});

export const checkUserSession =  () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_PENDING
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signUpStart = userCredentials => ({  // displayName, email, password
    type: UserActionTypes.SIGN_UP_PENDING,
    payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error.code
});

export const signInErrorMsg = message => ({
    type: UserActionTypes.SIGN_IN_ERROR_MSG,
    payload: message
});

export const signUpErrorMsg = message => ({
    type: UserActionTypes.SIGN_UP_ERROR_MSG,
    payload: message
});