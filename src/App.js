import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import './App.css';


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact={true} path='/'>       {/* 3.0  component={HomePage} */}
            <HomePage />
          </Route>
          <Route exact={true} path='/shop'>
            <ShopPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;