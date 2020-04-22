import CartActionTypes from './cart.types';

export const toggleCartHiddenAct = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItemsAction = item =>({  // the item that wanted to add
    type: CartActionTypes.ADD_ITEM,
    payload: item
})

export const removeItem = item => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
})

export const clearItemFromCart = item => ({  // the item that wanted to remove
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
})

export const clearCartAfterPay = () => ({
    type: CartActionTypes.CLEAR_CART_AFTER_PAYMENT
})