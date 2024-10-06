import React from "react";
import style from "./NavBarPanelOrders.module.css";

// REACT BOOSTRAP
import { Navbar, Nav, Container } from 'react-bootstrap';
//------------>

// COMPONENTS ------>
import { SearchBox } from "../../../components/indexComponents.js";
// <-----------------

const NavBarPanelOrders = () => {

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item className={style.navItem}>
                            N° Pedido 
                            <SearchBox 
                                urlNavigate={'/orders-panel'} 
                                isProduct={false} 
                                isUser={false} 
                                isOrder={true}
                                isEmail={false}
                            />
                        </Nav.Item>
                        <Nav.Item className={style.navItem}> 
                            Usuario
                            <SearchBox 
                                urlNavigate={'/orders-panel'} 
                                isProduct={false} 
                                isUser={false} 
                                isOrder={false}
                                isEmail={true}
                            />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBarPanelOrders;