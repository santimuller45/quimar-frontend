import React from "react";
import style from './UserNavBar.module.css';
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP
import { Nav, NavDropdown } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const UserNavBar = () => {

    const { state, userLogOut } = useUser();
    const localUser = state.user || {};
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await userLogOut();
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <Nav className="ms-auto">
            <Nav.Link href="/order">
                <span className={style.navLink}><FontAwesomeIcon icon={faCirclePlus}/> Mi Pedido</span>
            </Nav.Link>
            { localUser.email
                ?
                <NavDropdown title={<span className={style.navLink}><FontAwesomeIcon icon={faUser} /> Cuenta</span>} id="basic-nav-dropdown-account" className={style.navDropdown}>
                    <NavDropdown.Item href="/account">Mi Cuenta</NavDropdown.Item>
                    <NavDropdown.Item href="/account-panel">Panel de cuenta</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><button onClick={logoutHandler}>Desconectar</button></NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown title={<span className={style.navLink}><FontAwesomeIcon icon={faUser} /> Cuenta</span>} id="basic-nav-dropdown-account" className={style.navDropdown}>
                    <NavDropdown.Item href="/log-in">Ingresar</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/register">Registrarse</NavDropdown.Item>
                </NavDropdown>
                
            }
        </Nav>
    )
};

export default UserNavBar;