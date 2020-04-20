import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signIn-and-sigUp/signIn-and-sigUp.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';


class App extends Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){ // not  null / sign out
        const userRef = await createUserProfileDocument(userAuth)

        // To get user data
        userRef.onSnapshot(snapShot => {
          setCurrentUser({ id: snapShot.id, ...snapShot.data() })
        })
      }else{
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
          <Header />
          <Switch>
            <Route exact={true} path='/'>       
              <HomePage />
            </Route>
            <Route path='/shop' component={ShopPage} />  {/* 3.0  component={Page} */}
            <Route exact path='/checkout'>
              <CheckoutPage />
            </Route>
            <Route exact path='/signin'>        {/* 3.0  render */}
              {this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage/>}
            </Route>
          </Switch>
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