import React, { Component } from 'react';
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
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';


class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    //  listen to user login logout event 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){  // not  null > sign in
        // get document reference back from firebase.utils
        const userRef = await createUserProfileDocument(userAuth)

        // listen to doc snapShop obj update > Get user actual data (snapShot) when every update
        userRef.onSnapshot(snapShot => {
          // set state > sign in
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        })
      }else{
          // set state > sign out
        setCurrentUser(userAuth)  // null
    }})
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
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
                {this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage/>}
              </Route>
            </Switch>
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);