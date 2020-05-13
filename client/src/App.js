import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signIn-and-sigUp/signIn-and-sigUp.component';
import CheckoutPage from './pages/checkout/checkout.component';
import ContactPage from './pages/contact/contact.component';

import Header from './components/header/header.component';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.css';


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    // check if user has signed in
    checkUserSession()
  }, [checkUserSession]);  // componentDidMount

  return (
    <div>
      <Router>
        <ScrollToTop>
          <Header />
          <Switch>
            <Route exact={true} path='/'>       
              <HomePage />
            </Route>
            <Route path='/shop' component={ShopPage} />  {/* 3.0  component={Page} */}
            <Route exact path='/contact'>       
              <ContactPage />
            </Route>
            <Route exact path='/checkout'>
              <CheckoutPage />
            </Route>
            <Route exact path='/signin'>        {/* 3.0  render */}
              {currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage/>}
            </Route>
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
};


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);