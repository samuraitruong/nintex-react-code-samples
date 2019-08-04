import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import CheckoutPage from '../../containers/checkoutPage';
import HomePage from '../../containers/homePage';
import Header from './header';

function app() {
  return (
    <div className="container">
      <Router>
        <Header />
        <div className="body pt-5">
          <Route path="/" exact component={HomePage} />
          <Route path="/checkout/" component={CheckoutPage} />
        </div>
      </Router>
    </div>
  );
}
export default app;
