import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './header.styles.scss';

const Header = ({ currentUser }) => (
    <nav className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>SHOP</Link>
            <Link to='/shop' className='option'>CONTACT</Link>
            {currentUser
            ? <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
            : <Link to='/signin' className='option'>Sign In</Link>
            }
        </div>
    </nav>
);

const mapStateToProps = rootReducer => ({
    currentUser: rootReducer.user.currentUser
})

export default connect(mapStateToProps)(Header);
