import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './NavBar.module.css';

// LOGO ----->
import logo from '../../assets/logo.png';
//-------<

// CONTEXT -------->
import { useProducts } from "../../customHooks/useProducts.js";
// <----------------

// COMPONENTS ---------->
import { SearchBox, UserNavBar } from "../indexComponents.js";
// <---------------------

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

const NavBar = () => {

    const navigate = useNavigate();
    const { getAllProducts } = useProducts();

    // Manejador para el enlace de productos
    const handleProductsClick = async () => {
        await getAllProducts(); // Llamar la función del contexto
        navigate("/products"); // Navegar a la página de productos
    };

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
                        <Nav.Link className={style.navLink} onClick={handleProductsClick}>Productos</Nav.Link>
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