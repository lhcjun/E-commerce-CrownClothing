import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

// import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHiddenAct } from '../../redux/cart/cart.actions';
import { CartDropdownContainer, CartItemsContainer, EmptyMessageContainer, CartDropdownButton } from './cart-dropdown.styles';
// import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (  /* cartItems = array */
    <CartDropdownContainer>             {/* <div className='cart-dropdown'> */}
        <CartItemsContainer>            {/* <div className='cart-items'> */}
            {cartItems.length
              ? cartItems.map(cartItem => 
                  <CartItem key={cartItem.id} item={cartItem} /> 
                )
              : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>   /* <span className='empty-message'> */
            }
        </CartItemsContainer>
        <CartDropdownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHiddenAct());
        }}>
            Go To Checkout
        </CartDropdownButton>           {/* <CustomButton> */}
    </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));