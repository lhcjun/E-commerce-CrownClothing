import { all, call, takeLatest, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import CartActionTypes from './cart.types';
import { clearCart } from './cart.actions';


export function* clearCartOnSignOut(){
    yield put(clearCart());
}

export function* clearCartAfterPayment(){
    yield put(clearCart());
}

// base saga - sign out > clear cart
export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

// base saga - payment success > clear cart
export function* onPaymentSuccess() {
    yield takeLatest(CartActionTypes.PAYMENT_SUCCESS, clearCartAfterPayment);
}

export function* cartSagas(){
    yield all([
        call(onSignOutSuccess),
        call(onPaymentSuccess)
    ])
}