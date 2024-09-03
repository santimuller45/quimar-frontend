import React from "react";
import { useEffect } from "react";
import style from './AccountPanel.module.css'

// REACT BOOSTRAP --------->
// import { Col } from "react-bootstrap";
// <------------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const AccountPanel = () => {

    const { state, getAllUsers } = useUser();

    useEffect(() => {
        getAllUsers();
    },[])

    const allUsersDB = state.allUsers;

    return (
        <div className={style.container}>
            <h2><strong>PANEL DE CUENTAS</strong></h2>
                {
                    allUsersDB?.map((item, index) => (
                        <div key={index} className={style.container}>
                            <h4>{item.email}</h4>
                            <h4>{item.name}</h4>
                            <h4>{item.cuit}</h4>
                            <h4>{item.address}</h4>
                            <h4>{item.state}</h4>
                            <h4>{item.city}</h4>
                            <h4>{item.postalCode}</h4>
                            <h4>{item.phone}</h4>
                        </div>
                    ))
                }
        </div>
    )
};

export default AccountPanel;