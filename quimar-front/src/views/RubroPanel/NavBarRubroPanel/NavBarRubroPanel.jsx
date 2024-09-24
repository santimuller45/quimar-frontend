import React from "react";
import style from "./NavBarRubroPanel.module.css";

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

const NavBarRubroPanel = ({ createRubroSubmitHandler }) => {

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <button onClick={createRubroSubmitHandler} className={style.logButton} aria-label="crear rubro">
                                Crear Rubro
                            </button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBarRubroPanel;