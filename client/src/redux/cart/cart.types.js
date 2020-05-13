const CartActionTypes = {
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',  // CartIcon
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS', // StripeCheckoutButton
    CLEAR_CART: 'CLEAR_CART'    // SignOut
}

export default CartActionTypes;