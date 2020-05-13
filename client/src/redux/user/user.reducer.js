import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    signInErrorMsg: null,
    signUpErrorMsg: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,            // clear error
                signInErrorMsg: null,   // clear error msg 
                signUpErrorMsg: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
                signInErrorMsg: null,
                signUpErrorMsg: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case UserActionTypes.SIGN_IN_ERROR_MSG:
            return {
                ...state,
                signInErrorMsg: action.payload,
                signUpErrorMsg: null
            };
        case UserActionTypes.SIGN_UP_ERROR_MSG:
            return {
                ...state,
                signUpErrorMsg: action.payload,
                signInErrorMsg: null
            };
        default:
            return state;
    }
};

export default userReducer;