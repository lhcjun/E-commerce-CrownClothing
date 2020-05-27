import { all, call, takeLatest, put, select } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { getUserCartRef } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* clearCartAfterPayment() {
  yield put(clearCart());
}

// pull user's cart from firebase after sign in > merge session storage cart into db
export function* checkCartFromFirebase({ payload: user }) {  // sign in success
  // pass user id > get cart related info from firebase > return user's cart doc ref
  const cartRef = yield getUserCartRef(user.id);
  const cartSnapshot = yield cartRef.get();
  
  // get actual cartItems > user's own cart pull from firebase db
  const userCart = cartSnapshot.data().cartItems;
  // get cartItems state (cartItems before sign in > session storage)
  const browserCart = yield select(selectCartItems);

  // merge session storage into db (keep db item if a duplicate id is encountered)
  let localAndDatabaseCart = [
    ...userCart,
    ...browserCart.filter(itemB => !userCart.some(itemA => itemA.id === itemB.id))
  ];

  // to update cartItems state
  const cartItems = localAndDatabaseCart;
  // update firebase user's cart
  yield cartRef.update({ cartItems });

  // pass cartItems to set user's cart
  yield put(setCartFromFirebase(cartItems));
}

export function* updateCartInFirebase() {
  // get state
  const currentUser = yield select(selectCurrentUser);
  const cartItems = yield select(selectCartItems);

  if (currentUser) {
    try {
      // pass user id > get cart related info from firebase > return user's cart doc ref
      const cartRef = yield getUserCartRef(currentUser.id);
      // update firebase user's cart
      yield cartRef.update({ cartItems });
    } catch (error) {
      console.log(error);
    }
  }
}

// base saga - sign out > clear cart
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// base saga - payment success > clear cart
export function* onPaymentSuccess() {
  yield takeLatest(CartActionTypes.PAYMENT_SUCCESS, clearCartAfterPayment);
}

// base saga - user sign in > check user's cart
export function* onUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, checkCartFromFirebase);
}

// base saga - user update cart > update firebase
export function* onCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
    call(onPaymentSuccess),
    call(onUserSignIn),
    call(onCartChange),
  ]);
}