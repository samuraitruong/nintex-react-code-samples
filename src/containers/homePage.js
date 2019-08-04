/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePageComponent extends Component {
  render() {
    return (
      <div>
        <Link to="/checkout" className="btn btn-success btn-lg">Go to checkout page</Link>
      </div>
    );
  }
}
export default HomePageComponent;
