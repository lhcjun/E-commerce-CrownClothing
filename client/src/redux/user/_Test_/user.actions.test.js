import UserActionTypes from '../user.types';
import { googleSignInStart, emailSignInStart, signInSuccess, signInFailure, checkUserSession, signOutStart, signOutSuccess, signOutFailure, signUpStart, signUpSuccess, signUpFailure, signInErrorMsg, signUpErrorMsg } from '../user.actions';

describe('googleSignInStart action', () => {
    it('should create the googleSignInStart action', () => {
      expect(googleSignInStart().type).toEqual(
        UserActionTypes.GOOGLE_SIGN_IN_PENDING
      );
    });
});

describe('emailSignInStart action', () => {
    const mockEmailAndPassword = { email: 'test@gmail.com', password: 'test123' };
    it('should create the emailSignInStart action', () => {
        const action = emailSignInStart(mockEmailAndPassword);
        expect(action.type).toEqual(UserActionTypes.EMAIL_SIGN_IN_PENDING);
        expect(action.payload).toEqual(mockEmailAndPassword);
    });
});

describe('signInSuccess action', () => {
    const mockUser = { id: 1 };
    it('should create the signInSuccess action', () => {
        const action = signInSuccess(mockUser);
        expect(action.type).toEqual(UserActionTypes.SIGN_IN_SUCCESS);
        expect(action.payload).toEqual(mockUser);
    });
});

describe('signInFailure action', () => {
    const mockError = { code: 'sign in error' };
    it('should create the signInFailure action', () => {
      const action = signInFailure(mockError);
      expect(action.type).toEqual(UserActionTypes.SIGN_IN_FAILURE);
      expect(action.payload).toEqual(mockError.code);
    });
});

describe('checkUserSession action', () => {
    it('should create the checkUserSession action', () => {
      expect(checkUserSession().type).toEqual(
        UserActionTypes.CHECK_USER_SESSION
      );
    });
});

describe('signOutStart action', () => {
    it('should create the signOutStart action', () => {
      expect(signOutStart().type).toEqual(
        UserActionTypes.SIGN_OUT_PENDING
      );
    });
});

describe('signOutSuccess action', () => {
    it('should create the signOutSuccess action', () => {
      expect(signOutSuccess().type).toEqual(
        UserActionTypes.SIGN_OUT_SUCCESS
      );
    });
});

describe('signOutFailure action', () => {
    it('should create the signOutFailure action', () => {
        const action = signOutFailure('error');
        expect(action.type).toEqual(UserActionTypes.SIGN_OUT_FAILURE);
        expect(action.payload).toEqual('error');
    });
});

describe('signUpStart action', () => {
    const mockUserCredentials = {
        displayName: 'TestUser',
        email: 'test@gmail.com',
        password: 'test123'
    };

    it('should create the signUpStart action', () => {
        const action = signUpStart(mockUserCredentials);
        expect(action.type).toEqual(UserActionTypes.SIGN_UP_PENDING);
        expect(action.payload).toEqual(mockUserCredentials);
    });
});

describe('signUpSuccess action', () => {
    const mockUser = {};
    const mockAdditionalData = {};

    it('should create the signUpSuccess action', () => {
        const action = signUpSuccess({ mockUser, mockAdditionalData });
        expect(action.type).toEqual(UserActionTypes.SIGN_UP_SUCCESS);
        expect(action.payload).toEqual( mockUser, mockAdditionalData );
    });
});

describe('signUpFailure action', () => {
    const mockError = { code: 'sign up error' };
    it('should create the signUpFailure action', () => {
      const action = signUpFailure(mockError);
      expect(action.type).toEqual(UserActionTypes.SIGN_UP_FAILURE);
      expect(action.payload).toEqual(mockError.code);
    });
});

describe('signInErrorMsg action', () => {
    it('should create the signInErrorMsg action', () => {
      const action = signInErrorMsg('sign in error');
      expect(action.type).toEqual(UserActionTypes.SIGN_IN_ERROR_MSG);
      expect(action.payload).toEqual('sign in error');
    });
});

describe('signUpErrorMsg action', () => {
    it('should create the signUpErrorMsg action', () => {
      const action = signUpErrorMsg('sign up error');
      expect(action.type).toEqual(UserActionTypes.SIGN_UP_ERROR_MSG);
      expect(action.payload).toEqual('sign up error');
    });
});