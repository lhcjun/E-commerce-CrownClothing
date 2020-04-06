import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/signIn-and-sigUp/signIn-and-sigUp.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user)
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Router>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact={true} path='/'>       {/* 3.0  component={HomePage} */}
              <HomePage />
            </Route>
            <Route exact={true} path='/shop'>
              <ShopPage />
            </Route>
            <Route exact path='/signin'>
              <SignInAndSignUpPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;