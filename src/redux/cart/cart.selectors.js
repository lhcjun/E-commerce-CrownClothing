import { createSelector } from 'reselect';

// get cart reducer
const selectCart = state => state.cart;

// get cartItems state from cart reducer
export const selectCartItems = createSelector(      // memoize selector
    [selectCart],
    cart => cart.cartItems
)

// get hidden state from cart reducer
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
)

// total quantity of items (CartIcon.jsx)
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => (
        accumulatedQuantity + cartItem.quantity
    ), 0)
)

// total $ of items (CheckoutPages)
export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => (
        accumulatedQuantity + cartItem.quantity * cartItem.price
    ), 0)
)