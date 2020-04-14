import { createSelector } from 'reselect';

// get cart reducer
const selectCart = state => state.cart;

// get cartItems state from cart reducer
export const selectCartItems = createSelector(      // memoize selector
    [selectCart],
    cart => cart.cartItems
)

// total quantity of items (CartIcon.jsx)
export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => (
        accumulatedQuantity + cartItem.quantity
    ), 0)
)