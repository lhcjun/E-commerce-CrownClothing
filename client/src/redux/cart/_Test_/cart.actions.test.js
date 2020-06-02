import CartActionTypes from '../cart.types';
import { toggleCartHiddenAct, addItemsAction, removeItem, clearItemFromCart, paymentSuccess, clearCart, setCartFromFirebase, updateCartInFirebase } from '../cart.actions';

describe('toggleCartHiddenAct action', () => {
    it('should create the toggleHidden action', () => {
        expect(toggleCartHiddenAct().type).toEqual(CartActionTypes.TOGGLE_CART_HIDDEN);
    })
});

describe('addItem action', () => {
    it('should create the addItem action', () => {
        const mockItem = { id: 1 };
        const action = addItemsAction(mockItem);
        expect(action.type).toEqual(CartActionTypes.ADD_ITEM);
        expect(action.payload).toEqual(mockItem);
    });
});

describe('removeItem action', () => {
    it('should create the removeItem action', () => {
        const mockItem = { id: 1 };
        const action = removeItem(mockItem);
        expect(action.type).toEqual(CartActionTypes.REMOVE_ITEM);
        expect(action.payload).toEqual(mockItem);
    });
});

describe('clearItemFromCart action', () => {
    it('should create the clearItemFromCart action', () => {
        const mockItem = { id: 1 };
        const action = clearItemFromCart(mockItem);
        expect(action.type).toEqual(CartActionTypes.CLEAR_ITEM_FROM_CART);
        expect(action.payload).toEqual(mockItem);
    });
});

describe('clearCart action', () => {
    it('should create the clearCart action', () => {
        expect(clearCart().type).toEqual(CartActionTypes.CLEAR_CART);
    });
});

describe('paymentSuccess action', () => {
    it('should create the paymentSuccess action', () => {
        expect(paymentSuccess().type).toEqual(CartActionTypes.PAYMENT_SUCCESS);
    });
});

describe('setCartFromFirebase action', () => {
    it('should create the setCartFromFirebase action', () => {
        const mockCartItems = [ { id: 1 }, { id: 2 } ];
        const action = setCartFromFirebase(mockCartItems);
        expect(action.type).toEqual(CartActionTypes.SET_CART_FROM_FIREBASE);
        expect(action.payload).toEqual(mockCartItems);
    });
});

describe('updateCartInFirebase action', () => {
    it('should create the updateCartInFirebase action', () => {
        expect(updateCartInFirebase().type).toEqual(CartActionTypes.UPDATE_CART_IN_FIREBASE);
    });
});