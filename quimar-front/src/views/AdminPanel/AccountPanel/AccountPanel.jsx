import React from "react";
import style from './AccountPanel.module.css'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Table, Button, Row, Col } from "react-bootstrap";
// <------------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../../customHooks/useUser.js";
// <----------------

// COMPONENTS ----->
import { PanelNavBar, PaginationComponent, UserForm } from "../../../components/indexComponents.js"; 
// <----------------

const AccountPanel = () => {

    const { state } = useUser();
    const navigate = useNavigate();

    // ESTADOS DE PAGINADO ------>
    const [currentPage , setCurrentPage ] = useState(1);
    const usersDB = state.showUsers;
    const usersPerPage = 20;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersDB.slice( indexOfFirstUser, indexOfLastUser );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // <--------------------------

    // CREO ESTADOS PARA MOSTRAR O NO EL COMPONENTE UserForm
    const [viewUser, setViewUser] = useState({});
    const [showModifyUser, setShowModifyUser] = useState(false);

    const handleCloseModifyUser = () => setShowModifyUser(false);
    
    const updateSubmitHandler = (user) => {
        setShowModifyUser(true);
        setViewUser(user);
    };

    useEffect(() => {
        if (!state.user.admin) navigate('/');
    }, [ navigate, state.user.admin, state.showUsers ]);

    return (
        <div className={style.containerFluid}>
            <h2 className={style.title}>Panel de Cuentas</h2>
            <PanelNavBar isUserPanel={true}/>
            <div className={style.table}>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr className="text-center">
                            <td>N° Usuario</td>
                            <td>Email</td>
                            <td>Nombre</td>
                            <td>CUIT</td>
                            <td>Dirección</td>
                            <td>Localidad</td>
                            <td>Provincia</td>
                            <td>Código Postal</td>
                            <td>Cel.</td>
                            <td>Estado</td>
                            <td>Admin</td>
                            <td>Modificar</td>
                        </tr>
                    </thead>
                    <tbody>
                        {   currentUsers?.length > 0
                            ?    
                            (currentUsers.map((user, index) => (
                                <tr key={index} className="text-center">
                                    <td>{user.userNumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.cuit}</td>
                                    <td>{user.address}</td>
                                    <td>{user.city}</td>
                                    <td>{user.state}</td>
                                    <td>{user.postalCode}</td>
                                    <td>{user.phone}</td>
                                    {/* STATUS DEL USUARIO */}
                                    <td>
                                        {user.userStatus 
                                        ? 
                                            <>
                                                <h6 style={{ color: 'green' }}>Activado</h6>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }}/> 
                                            </>
                                        :
                                            <>
                                                <h6 style={{ color: 'red' }}>Desactivado</h6>
                                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }}/>
                                            </>
                                        }
                                    </td>
                                    {/* STATUS DE USUARIO ADMIN */}
                                    <td>
                                        {user.admin 
                                        ? 
                                            <>
                                                <h6 style={{ color: 'green' }}>Activado</h6>
                                                <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }}/> 
                                            </>
                                        :
                                            <>
                                                <h6 style={{ color: 'red' }}>Desactivado</h6>
                                                <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }}/>
                                            </> 
                                        }
                                    </td>
                                    {/* MODIFICAR USUARIO */}
                                    <td>
                                        <Button onClick={ () => updateSubmitHandler(user)} className={style.tableButtons} aria-label="modificar usuario">
                                            <FontAwesomeIcon icon={faGear} />
                                        </Button>
                                    </td>
                                </tr>
                            )))
                            : null
                        }
                    </tbody>
                    {/* MODAL PARA MODIFICAR LOS DATOS DEL USUARIO */}
                    <UserForm
                        show={showModifyUser}
                        handleClose={handleCloseModifyUser}
                        user={viewUser}
                        isEditing={true}
                        isAdmin={state.user.admin}
                    />
                    {/*  */}
            </Table>
        </div>
            <Row className="justify-content-center mt-4">
                <Col xs="auto">
                    <PaginationComponent 
                        itemsPerPage={usersPerPage} 
                        itemsDB={usersDB.length} 
                        paginado={paginado} 
                        currentPage={currentPage}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default AccountPanel;