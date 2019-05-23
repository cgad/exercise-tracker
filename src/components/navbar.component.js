import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Exercises</Nav.Link>
            <Nav.Link href="/log">Log Exercise</Nav.Link>
            <Nav.Link href="/user">Create User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
