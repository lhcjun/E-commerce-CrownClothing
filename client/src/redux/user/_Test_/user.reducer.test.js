import UserActionTypes from '../user.types';
import userReducer from '../user.reducer';

const initialState = {
    currentUser: null,
    error: null,
    signInErrorMsg: null,
    signUpErrorMsg: null
};

describe('userReducer', () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should set currentUser to payload on signInSuccess action', () => {
        const mockUser = { id: 1, displayName: 'TestUser' };
        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_IN_SUCCESS,
            payload: mockUser
        }).currentUser).toEqual(mockUser);
    });

    it('should set currentUser to null on signOutSuccess action', () => {
        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_OUT_SUCCESS
        }).currentUser).toBe(null);
    });

    it('should set errorMessage to payload on signInFailure, signUpFailure, signOutFailure action', () => {
        const mockError = { message: 'error', code: 404 };

        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_IN_FAILURE,
            payload: mockError
        }).error).toEqual(mockError);

        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_OUT_FAILURE,
            payload: mockError
        }).error).toBe(mockError);

        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_UP_FAILURE,
            payload: mockError
        }).error).toBe(mockError);
    });

    it('should set signInErrorMsg to payload on signInErrorMsg action', () => {
        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_IN_ERROR_MSG,
            payload: 'sign in error'
        }).signInErrorMsg).toBe('sign in error');
    });

    it('should set signUpErrorMsg to payload on signUpErrorMsg action', () => {
        expect(userReducer(initialState, {
            type: UserActionTypes.SIGN_UP_ERROR_MSG,
            payload: 'sign up error'
        }).signUpErrorMsg).toBe('sign up error');
    });
});