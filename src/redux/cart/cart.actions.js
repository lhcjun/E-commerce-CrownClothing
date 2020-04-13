import CartActionTypes from './cart.types';

export const toggleCartHiddenAct = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const addItemsAction = item =>({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})
