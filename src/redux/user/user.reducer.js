import UserActionTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    errorMessage: null
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null,         // clear error
                errorMessage: null   // clear error msg 
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null,
                errorMessage: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case UserActionTypes.SIGN_IN_ERROR_MSG:
        case UserActionTypes.SIGN_UP_ERROR_MSG:
            return {
                ...state,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;