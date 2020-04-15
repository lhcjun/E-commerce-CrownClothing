// pull out from cart reducer

// add one new item to cartItems state
export const addItemToCart = (cartItems, cartItemToAdd) => {  // existing items & new
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    ) // each

    if(existingCartItem){
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem    // each item
        )
    }
    // not existing > add new item
    return [...cartItems, {...cartItemToAdd, quantity: 1}]   // create quantity
}           // all items      new item


// remove one item from cartItems state
export const removeItemFromCart = (cartItems, cartItemToRemove) => { // existing items & remove one
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    // quantity = 1
    if(existingCartItem.quantity === 1){
        // clear item from cart  >  keep the ones don't match (new array)
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // quantity > 1 or not existing
    return cartItems.map(cartItem => 
        cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )
}