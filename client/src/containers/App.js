import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from '../components/header/header.component';
import ScrollToTop from '../components/scroll-to-top/ScrollToTop';
import Spinner from '../components/spinner/spinner.component';
import ErrorBoundary from '../components/error-boundary/error-boundary.component';
import { selectCurrentUser } from '../redux/user/user.selectors';
import { checkUserSession } from '../redux/user/user.actions';
import { GlobalStyle } from '../global.styles';

// code splitting > lazy component
const HomePage = lazy(() => import('../pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('../pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('../pages/signIn-and-sigUp/signIn-and-signUp.component'));
const CheckoutPage = lazy(() => import('../pages/checkout/checkout.component'));
const ContactPage = lazy(() => import('../pages/contact/contact.component'));


const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    // check if user has signed in
    checkUserSession()
  }, [checkUserSession]);  // componentDidMount

  return (
    <div>
      <Router>
        <ScrollToTop>
          <GlobalStyle />
          <Header />
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact={true} path='/'>       
                  <HomePage />
                </Route>
                <Route path='/shop' component={ShopPage} />  {/* 3.0  component={Page} */}
                <Route exact path='/contact'>       
                  <ContactPage />
                </Route>
                <Route exact path='/checkout'>
                  {currentUser ? <CheckoutPage /> : <SignInAndSignUpPage/>}
                </Route>
                <Route exact path='/signin'>        {/* 3.0 - render */}
                  {currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage/>}
                </Route>
              </Switch>
            </Suspense>
          </ErrorBoundary>
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