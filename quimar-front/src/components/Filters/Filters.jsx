import React from "react";
import style from './Filters.module.css';
import { useSelector } from "react-redux";

// REACT BOOSTRAP ------>
import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
// <---------------------

const Filters = ( { handleFilterRubro, handleFilterBySubRubro } ) => {

    const listRubros = useSelector(state => state.allRubros);

    return (
        <Navbar expand="lg" className={style.nav}>
            <Container fluid="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Rubros" id="basic-nav-dropdown-rubro">
                            {
                                listRubros?.map(rubro => (
                                    <React.Fragment>
                                        <NavDropdown.Item disabled key={rubro.id}>{rubro.name}</NavDropdown.Item>
                                        { rubro.subRubro?.map((sub, index) => (
                                            <NavDropdown.Item key={index} onClick={() => handleFilterBySubRubro(sub)}>{sub}</NavDropdown.Item>
                                        )) }
                                        <NavDropdown.Divider />
                                    </React.Fragment>
                                ))
                            }
                        </NavDropdown>

                    </Nav>
                    {/* <Nav className="me-auto">
                        { listRubros?.map((rubro, index) => (
                            <NavDropdown key={index} title={rubro.name} id={`basic-nav-dropdown-rubro-${index}`} className={style.navDropdown}>
                                {
                                    rubro.subRubro?.map((sub, index2) => (
                                        <NavDropdown.Item key={index2} onClick={() => handleFilterBySubRubro(sub)}>{sub}</NavDropdown.Item>
                                    ))
                                }
                            </NavDropdown>
                        ))}
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Filters;