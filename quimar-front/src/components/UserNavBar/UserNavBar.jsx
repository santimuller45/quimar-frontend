import React from "react";
import style from './UserNavBar.module.css';

// REACT BOOSTRAP
import { Nav, NavDropdown } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
// <-------------------

const UserNavBar = () => {
    return (
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
    )
};

export default UserNavBar;