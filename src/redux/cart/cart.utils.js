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
    // not existing
    return [...cartItems, {...cartItemToAdd, quantity: 1}]   // first time added
}           // all items      new item