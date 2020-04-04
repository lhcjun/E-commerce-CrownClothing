import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact={true} path='/'>       {/* 3.0  component={HomePage} */}
            <HomePage />
          </Route>
          <Route exact={true} path='/hats'>   {/*  component={HatsPage} */}
            <HatsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;