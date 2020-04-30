import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
// import './header.styles.scss';


const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>                   {/* <nav className='header'>  */}
        <LogoContainer to='/'>          {/* <Link to='/' className='logo-container'> */}
            <Logo />
        </LogoContainer>
        <OptionsContainer>              {/* <div className='options'> */}
            <OptionLink to='/shop'>SHOP</OptionLink>        {/* className='option' */}
            <OptionLink to='/contact'>CONTACT</OptionLink>
            {currentUser
              ? <OptionLink as='div' onClick={() => auth.signOut()}>Sign Out</OptionLink>
              : <OptionLink to='/signin'>Sign In</OptionLink>
            }
            <CartIcon />
        </OptionsContainer>
        { hidden ? null : <CartDropdown /> }
    </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
