import React from "react";
import style from './NavBar.module.css'

// REACT BOOSTRAP
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
//------------>

//LOGO ----->
import logo from '../../assets/logo.png'
//-------<

const NavBar = () => {
    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Brand>
                    <img
                        src={logo}
                        width="50rem"
                        height="50rem"
                        className="d-inline-block align-top"
                        alt="Quimar logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand href="/">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Contacto</Nav.Link>
                        <Nav.Link href="#link">Nosotros</Nav.Link>
                        <NavDropdown title="Rubros" id="basic-nav-dropdown-rubros">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Cuenta" id="basic-nav-dropdown-account">
                            <NavDropdown.Item href="/account">Mi Cuenta</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/account-panel">Panel de cuenta</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)};

export default NavBar;