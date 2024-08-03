import React from "react";
import style from './NavBar.module.css'

//LOGO ----->
import logo from '../../assets/logo4.png'
//-------<

// REACT BOOSTRAP
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
// <-------------------

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
                        <Nav.Link href="/" className={style.navLink}>Inicio</Nav.Link>
                        <Nav.Link href="/contact" className={style.navLink}>Contacto</Nav.Link>
                        <Nav.Link href="/us" className={style.navLink}>Nosotros</Nav.Link>
                        <NavDropdown title={<span className={style.navLink}>Rubros</span>} id="basic-nav-dropdown-rubros" className={style.navDropdown}>
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {/* ACC Y PEDIDOS */}
                    <Nav className="ms-auto">
                        <NavDropdown title={<span className={style.navLink}><FontAwesomeIcon icon={faCirclePlus}/> Mi Pedido</span>} id="basic-nav-dropdown-pedido" className={style.navDropdown}>
                            <NavDropdown.Item href="/">Ver Pedido</NavDropdown.Item>
                            <NavDropdown.Item href="/">Mis Pedidos</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={<span className={style.navLink}><FontAwesomeIcon icon={faUser}/> Cuenta</span>} id="basic-nav-dropdown-account" className={style.navDropdown}> 
                            <NavDropdown.Item href="/account">Mi Cuenta</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/account-panel">Panel de cuenta</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
)};

export default NavBar;