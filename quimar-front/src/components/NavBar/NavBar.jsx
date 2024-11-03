import React from "react";
import { Link } from "react-router-dom";
import style from './NavBar.module.css';

// LOGO ----->
import logo from '../../assets/logo.png';
//-------<

// COMPONENTS ---------->
import { SearchBox, UserNavBar } from "../indexComponents.js";
// <---------------------

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

const NavBar = () => {

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <div className={style.logoSection}>
                    <img
                        src={logo}
                        className={style.logo}
                        alt="Quimar logo"
                    />
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className={style.navLink}>Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/contact-us" className={style.navLink}>Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/about-us" className={style.navLink}>Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/products" className={style.navLink}>Productos</Nav.Link>
                    </Nav>
                    {/* SEARCHBAR */}
                    <SearchBox 
                        urlNavigate={'/products'} 
                        isProduct={true}
                    />
                    {/* USERBAR */}
                    <UserNavBar/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)};

export default NavBar;