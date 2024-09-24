import React from "react";
import style from './UserNavBar.module.css';
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP
import { Nav, NavDropdown } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faUser, faUnlock, faUsers, faGears, faFileCircleCheck, faSliders } from '@fortawesome/free-solid-svg-icons';
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
            navigate('/');
            userLogOut();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <Nav className="ms-auto">
            <Nav.Link href="/order">
                <span className={style.navTitle}><FontAwesomeIcon icon={faCirclePlus}/> Mi Pedido</span>
            </Nav.Link>
            { localUser.email
                ?
                <NavDropdown title={<span className={style.navTitle}><FontAwesomeIcon icon={faUser}/> Cuenta</span>} id="basic-nav-dropdown-account">
                    <NavDropdown.Item href="/account"><span className={style.navLink}>Mi Cuenta</span></NavDropdown.Item>
                    <NavDropdown.Item href="/"><span className={style.navLink}>Mis pedidos</span></NavDropdown.Item>
                    <NavDropdown.Item href="/"><span className={style.navLink}>Cambiar contraseña</span></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><button onClick={logoutHandler} className={style.logButton}>Desconectar</button></NavDropdown.Item>
                </NavDropdown>
                :
                <NavDropdown title={<span className={style.navTitle}><FontAwesomeIcon icon={faUser} /> Cuenta</span>} id="basic-nav-dropdown-account">
                    <NavDropdown.Item href="/log-in"><span className={style.navLink}>Ingresar</span></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/register"><span className={style.navLink}>Registrarme</span></NavDropdown.Item>
                </NavDropdown>
            }
            {
                localUser.admin
                ?
                <NavDropdown title={<span className={style.navTitle}><FontAwesomeIcon icon={faUnlock}/> Admin</span>} id="basic-nav-dropdown-admin">
                    <NavDropdown.Item href="/product-panel"><span className={style.navLink}><FontAwesomeIcon icon={faGears}/> Productos</span></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/rubro-panel"><span className={style.navLink}><FontAwesomeIcon icon={faSliders} /> Rubros</span></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/account-panel"><span className={style.navLink}><FontAwesomeIcon icon={faUsers}/> Cuentas</span></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/orders-panel"><span className={style.navLink}><FontAwesomeIcon icon={faFileCircleCheck} /> Pedidos</span></NavDropdown.Item>
                </NavDropdown>
                : null
            }
        </Nav>
    )
};

export default UserNavBar;