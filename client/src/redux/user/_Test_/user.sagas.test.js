import { takeLatest, put, call } from 'redux-saga/effects';
import UserActionTypes from '../user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from '../user.actions';
import { getSnapshotFromUserAuth, signInWithGoogle, signInWithEmail, isUserAuthenticated, signOut, signUp, signInAfterSignUp, onGoogleSignInStart, onEmailSignInStart, onCheckUserSession, onSignOutStart, onSignUpStart, onSignUpSuccess } from '../user.sagas';


// base saga
describe('onGoogleSignInStart saga', () => {
    it('should trigger on GOOGLE_SIGN_IN_PENDING', () => {
        const generator = onGoogleSignInStart();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.GOOGLE_SIGN_IN_PENDING, signInWithGoogle)
        );
    });
});

describe('onEmailSignInStart saga', () => {
    it('should trigger on EMAIL_SIGN_IN_PENDING', () => {
        const generator = onEmailSignInStart();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.EMAIL_SIGN_IN_PENDING, signInWithEmail)
        );
    });
});

describe('onCheckUserSession saga', () => {
    it('should trigger on CHECK_USER_SESSION', () => {
        const generator = onCheckUserSession();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
        );
    });
});

describe('onSignOutStart saga', () => {
    it('should trigger on SIGN_OUT_PENDING', () => {
        const generator = onSignOutStart();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.SIGN_OUT_PENDING, signOut)
        );
    });
});

describe('onSignUpStart saga', () => {
    it('should trigger on SIGN_UP_PENDING', () => {
        const generator = onSignUpStart();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.SIGN_UP_PENDING, signUp)
        );
    });
});

describe('onSignUpSuccess saga', () => {
    it('should trigger on SIGN_UP_SUCCESS', () => {
        const generator = onSignUpSuccess();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
        );
    });
});


// callback saga
describe('getSnapshotFromUserAuth saga', () => {
    const mockUserAuth = {};
    const mockAdditionalData = {};
    const generator = getSnapshotFromUserAuth(mockUserAuth, mockAdditionalData);

    it('call createUserProfileDocument firebase utils', () => {
        expect(generator.next().value).toEqual(
            call(createUserProfileDocument, mockUserAuth, mockAdditionalData)
        );
    });
});

describe('signInWithGoogle saga', () => {
    const generator = signInWithGoogle();

    it('should call auth.signInWithPopup', () => {
        const signInWithPopup = jest.spyOn(auth, 'signInWithPopup');
        generator.next();
        expect(signInWithPopup).toHaveBeenCalled();
    });
});

describe('signInWithEmail saga', () => {
    const mockEmail = 'test@gamil.com';
    const mockPassword = 'test123';

    const mockAction = { 
        payload: { 
            email: mockEmail, 
            password: mockPassword
        } 
    };
    const generator = signInWithEmail(mockAction);

    it('should call auth.signInWithEmailAndPassword', () => {
        const signInWithEmailAndPassword = jest.spyOn(auth, 'signInWithEmailAndPassword');
        generator.next();
        expect(signInWithEmailAndPassword).toHaveBeenCalled();
    });
});

describe('isUserAuthenticated saga', () => {
    const generator = isUserAuthenticated();

    it('should call getCurrentUser', () => {
        expect(generator.next().value).toEqual(getCurrentUser());
    });

    it('should call getSnapshotFromUserAuth if userAuth exists', () => {
        const mockUserAuth = { uid: 'test123' }
        expect(generator.next(mockUserAuth).value).toEqual(getSnapshotFromUserAuth(mockUserAuth));
    });

    it('should call signInFailure on error', () => {
        const newGenerator = isUserAuthenticated();
        newGenerator.next();
        expect(newGenerator.throw('auth error').value).toEqual(put(signInFailure('auth error')));
    });
});

describe('signOut saga', () => {
    const generator = signOut();

    it('should call auth.signOut', () => {
        const exceptSignOut = jest.spyOn(auth, 'signOut');
        generator.next();
        expect(exceptSignOut).toHaveBeenCalled();
    });

    it('should call signOutSuccess', () => {
        expect(generator.next().value).toEqual(put(signOutSuccess()));
    });

    it('should call signOutFailure on error', () => {
        const newGenerator = signOut();
        newGenerator.next();
        expect(newGenerator.throw('sign out error').value).toEqual(
            put(signOutFailure('sign out error'))
        );
    });
});

describe('signUp saga', () => {
    const mockEmail = 'test@gmail.com';
    const mockPassword = 'test123';
    const mockDisplayName = 'TestUser'

    const mockAction = {
        payload: { 
            email: mockEmail, 
            password: mockPassword, 
            displayName : mockDisplayName
        }
    };

    const generator = signUp(mockAction);

    it('should call auth.createUserWithEmailAndPassword', () => {
        const createUserWithEmailAndPassword = jest.spyOn(auth, 'createUserWithEmailAndPassword');
        generator.next();
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
});

describe('signInAfterSignUp saga', () => {
    const mockUser = {};
    const mockAdditionalData = {};
    
    const mockAction = {
        payload: {
            user: mockUser,
            additionalData: mockAdditionalData 
        }
    };
    const generator = signInAfterSignUp(mockAction);

    it('should fire getSnapshotFromUserAuth saga', () => {
        expect(generator.next().value).toEqual(
            getSnapshotFromUserAuth(mockUser, mockAdditionalData)
        );
    });
});