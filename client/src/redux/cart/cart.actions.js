import CartActionTypes from './cart.types';

export const toggleCartHiddenAct = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItemsAction = item =>({  // the item that wanted to add
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItemFromCart = item => ({  // the item that wanted to remove
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

export const paymentSuccess = () => ({
    type: CartActionTypes.PAYMENT_SUCCESS
});

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
});

export const setCartFromFirebase = cartItems => ({
    type: CartActionTypes.SET_CART_FROM_FIREBASE,
    payload: cartItems
});

export const updateCartInFirebase = () => ({
    type: CartActionTypes.UPDATE_CART_IN_FIREBASE
});