import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
export class HeaderComponent extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">

        <Navbar.Brand as={Link} to="/">Nintex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Link to="/checkout" variant="outline-success">Checkout</Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default HeaderComponent;
