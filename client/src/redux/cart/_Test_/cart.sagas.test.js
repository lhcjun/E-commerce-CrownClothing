import { takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../../user/user.types';
import CartActionTypes from '../cart.types';
import { clearCart } from '../cart.actions';
import { clearCartOnSignOut, onSignOutSuccess, onPaymentSuccess, clearCartAfterPayment, onUserSignIn, checkCartFromFirebase, onCartChange, updateCartInFirebase } from '../cart.sagas';


// onSignOutSuccess > clearCartOnSignOut
describe('onSignOutSuccess saga', () => {
    it('should trigger on SIGN_OUT_SUCCESS', async () => {
        const generator = onSignOutSuccess();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
        );
    });
});

describe('clearCartOnSignOut saga', () => {
    it('should fire clearCart', () => {
        const generator = clearCartOnSignOut();
        expect(generator.next().value).toEqual(put(clearCart()));
    });
});


// onPaymentSuccess > clearCartAfterPayment
describe('onPaymentSuccess saga', () => {
    it('should trigger on PAYMENT_SUCCESS', async () => {
        const generator = onPaymentSuccess();
        expect(generator.next().value).toEqual(
            takeLatest(CartActionTypes.PAYMENT_SUCCESS, clearCartAfterPayment)
        );
    });
});

describe('clearCartAfterPayment saga', () => {
    it('should fire clearCart', () => {
        const generator = clearCartAfterPayment();
        expect(generator.next().value).toEqual(put(clearCart()));
    });
});


describe('onUserSignIn saga', () => {
    it('should trigger on SIGN_IN_SUCCESS', async () => {
        const generator = onUserSignIn();
        expect(generator.next().value).toEqual(
            takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase)
        );
    });
});

describe('onCartChange saga', () => {
    it('should trigger on ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM_FROM_CART', async () => {
        const generator = onCartChange();
        expect(generator.next().value).toEqual(
            takeLatest(
                [
                CartActionTypes.ADD_ITEM,
                CartActionTypes.REMOVE_ITEM,
                CartActionTypes.CLEAR_ITEM_FROM_CART,
                ],
                updateCartInFirebase
            )
        );
    });
});