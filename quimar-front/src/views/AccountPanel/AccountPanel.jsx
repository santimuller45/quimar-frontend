import React from "react";
import style from './AccountPanel.module.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Table, Button } from "react-bootstrap";
// <------------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// COMPONENTS ----->
import { PanelNavBar } from "../../components/indexComponents.js";
// <----------------

const AccountPanel = () => {

    const { state, getAllUsers } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        !state.user.admin && navigate('/');
        getAllUsers();
    },[]);

    const submitHandler = () => {};

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Cuentas</h2>
            <PanelNavBar isUserPanel={true}/>
            <Table striped bordered hover variant="dark" className={style.table}>
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
                    {   state.allUsers?.map((user, index) => (
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
                                    {user.userStatus ? <FontAwesomeIcon icon={faCircleCheck}/> : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </td>
                                {/* STATUS DE USUARIO ADMIN */}
                                <td>
                                    {user.admin ? <FontAwesomeIcon icon={faCircleCheck}/> : <FontAwesomeIcon icon={faCircleXmark}/>}
                                </td>
                                {/* MODIFICAR USUARIO */}
                                <td>
                                    <Button onClick={submitHandler} className={style.tableButtons} aria-label="modificar usuario">
                                        <FontAwesomeIcon icon={faGear} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
};

export default AccountPanel;