import React from 'react';
import { Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import ShiftsList from '../shifts/ShiftsList';
import Schedule from '../Schedule/Schedule';

const Header = () => (
  <div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Shift Management Demo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Shifts</Nav.Link>
          <Nav.Link href="/schedule">Schedule</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Route exact path="/" component={ShiftsList} />
    <Route exact path="/schedule" component={Schedule} />
  </div>
);

export default Header;
