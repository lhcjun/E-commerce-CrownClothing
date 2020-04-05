import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact={true} path='/'>       {/* 3.0  component={HomePage} */}
            <HomePage />
          </Route>
          <Route exact={true} path='/shop'>   {/*  component={ShopPage} */}
            <ShopPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;