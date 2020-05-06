import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)  // existing items & new
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload) // existing items & remove one
            };
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => 
                    // keep the items which don't match > return new array
                    cartItem.id !== action.payload.id
                )
            };
        case CartActionTypes.CLEAR_CART_AFTER_PAYMENT:
            return {
                ...state,
                cartItems: []
            };
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
}

export default cartReducer;