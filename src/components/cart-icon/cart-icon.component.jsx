import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHiddenAct } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';


const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <nav className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ itemCount }</span>
    </nav>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHiddenAct())
})

const mapStateToProps = createStructuredSelector({
    /* total quantity of items */     
    itemCount: selectCartItemsCount   /* selector */
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);