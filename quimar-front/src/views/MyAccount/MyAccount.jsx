import React from "react";
import style from "./MyAccount.module.css";

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------


const MyAccount = () => {

    const { state } = useUser();
    const localUser = state.user;

    return (
        <div className={style.container}>
            <header><h3 ><strong>MI CUENTA</strong></h3></header>
            {
                localUser
                ?
                <div>
                    <h3>{localUser.email}</h3>
                    <h3>{localUser.firstname}</h3>
                    <h3>{localUser.lastname}</h3>
                    <h3>{localUser.cuit}</h3>
                    <h3>{localUser.address}</h3>
                    <h3>{localUser.state}</h3>
                    <h3>{localUser.city}</h3>
                    <h3>{localUser.postalCode}</h3>
                    <h3>{localUser.phone}</h3>
                </div>
                : null
            }
                
        </div>
    )
};

export default MyAccount;