import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ShiftsList from '../shifts/ShiftsList';

const Header = () => (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Expenses Demo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Shifts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={ShiftsList} />
    </div>
  );

export default Header;
