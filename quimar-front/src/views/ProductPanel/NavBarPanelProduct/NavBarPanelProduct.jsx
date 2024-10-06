import React from "react";
import style from "./NavBarPanelProduct.module.css";

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

// COMPONENTS ------>
import { SearchBox } from "../../../components/indexComponents.js";
import FilterByStatus from "../FilterByStatus/FilterByStatus.jsx";
// <-----------------

const NavBarPanelProduct = ({ createSubmitHandler }) => {

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <button onClick={createSubmitHandler} className={style.logButton} aria-label="crear producto">
                                Crear Producto
                            </button>
                        </Nav.Item>
                    </Nav>
                    {/* SEARCHBOX */}
                    <div className={style.searchContainer}>
                        <SearchBox urlNavigate={'/product-panel'} isProduct={true} isUser={false} isOrder={false} isEmail={false}/>
                    </div>
                    <div className={style.searchContainer}>
                        <FilterByStatus></FilterByStatus>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBarPanelProduct;