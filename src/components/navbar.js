import React from "react"
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export const MyNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Costeapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/costos-fijos">Costos fijos</Nav.Link>
          <Nav.Link as={Link} to="/insumos">Insumos</Nav.Link>
          <Nav.Link as={Link} to="/recetas">Recetas</Nav.Link>
          <Nav.Link as={Link} to="/reporte">Reporte</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/about">Acerca de</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
