import React from "react";
import style from "./PanelNavBar.module.css";

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

// COMPONENTS ------>
import { SearchBox, FilterByStatus, FilterByRubro, FilterByDate } from "../indexComponents.js";
// <-----------------

const PanelNavBar = ({ createProductSubmitHandler, createRubroSubmitHandler, isProductPanel, isUserPanel, isRubroPanel, isOrderPanel }) => {

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* PANEL DE PRODUCTOS */}
                    {   isProductPanel
                        ?
                        <Nav className="me-auto">
                            <Nav.Item className={style.navItem}>
                                <button onClick={createProductSubmitHandler} className={style.buttonItem} aria-label="crear producto">
                                    Crear Producto
                                </button>
                            </Nav.Item>
                            <Nav.Item className={style.navItem}>
                                Nombre / Código
                                <SearchBox 
                                    urlNavigate={'/product-panel'} 
                                    isProduct={true}
                                />
                            </Nav.Item>
                            <Nav.Item className={style.navItem}>
                                <FilterByStatus isProduct={true}/>
                            </Nav.Item>
                            <Nav.Item className={style.navItem}>
                                <FilterByRubro/>
                            </Nav.Item>
                        </Nav>
                        : null
                    }
                    {/* PANEL DE USERS */}
                    {   isUserPanel
                        ?
                        <Nav className="me-auto">
                            <Nav.Item className={style.navItem}>
                                N° Usuario / Nombre
                                <SearchBox 
                                    urlNavigate={'/account-panel'} 
                                    isUser={true}
                                />
                            </Nav.Item>
                            <Nav.Item className={style.navItem}>
                                <FilterByStatus isUser={true}/>
                            </Nav.Item>
                        </Nav>
                        : null
                    }
                    {/* PANEL DE RUBROS */}
                    {   isRubroPanel
                        ?
                        <Nav className="me-auto">
                            <Nav.Item>
                                <button onClick={createRubroSubmitHandler} className={style.buttonItem} aria-label="crear rubro">
                                    Crear Rubro
                                </button>
                            </Nav.Item>
                        </Nav>
                        : null
                    }
                    {/* PANEL DE ORDERS */}
                    {   isOrderPanel
                        ?
                        <Nav className="me-auto">
                            <Nav.Item className={style.navItem}>
                                N° Pedido 
                                <SearchBox 
                                    urlNavigate={'/orders-panel'}
                                    isOrder={true}
                                />
                            </Nav.Item>
                            <Nav.Item className={style.navItem}> 
                                N° Usuario
                                <SearchBox 
                                    urlNavigate={'/orders-panel'} 
                                    userOrder={true}
                                />
                            </Nav.Item>
                            <Nav.Item className={style.navItem}>
                                <FilterByDate/>
                            </Nav.Item>
                        </Nav>
                        : null
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default PanelNavBar;