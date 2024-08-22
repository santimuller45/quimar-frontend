import React from "react";
import style from './UserNavBar.module.css';

// REACT BOOSTRAP
import { Nav, NavDropdown } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons'
// <-------------------

const UserNavBar = () => {
    return (
        <Nav className="ms-auto">
            <Nav.Link href="/order">
                <span className={style.navLink}><FontAwesomeIcon icon={faCirclePlus}/> Mi Pedido</span>
            </Nav.Link>
            <NavDropdown title={<span className={style.navLink}><FontAwesomeIcon icon={faUser} /> Cuenta</span>} id="basic-nav-dropdown-account" className={style.navDropdown}> 
                <NavDropdown.Item href="/register">Registrarse</NavDropdown.Item>
                <NavDropdown.Item href="/account">Mi Cuenta</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/account-panel">Panel de cuenta</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
};

export default UserNavBar;