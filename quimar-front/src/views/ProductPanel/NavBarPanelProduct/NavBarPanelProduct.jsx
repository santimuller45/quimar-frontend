import React from "react";
import style from "./NavBarPanelProduct.module.css";

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

import { SearchBox } from "../../../components/indexComponents.js";

const NavBarPanelProduct = () => {
    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item><button onClick={() => {}} className={style.logButton}>Crear Producto</button></Nav.Item>
                    </Nav>
                    {/* SEARCHBAR */}
                    <SearchBox/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBarPanelProduct;