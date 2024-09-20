import React from "react";
import style from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// COMPONENTES ------->
import { UserInfo } from "../../components/indexComponents.js";
// <-------------------


const MyAccount = () => {

    const navigate = useNavigate();
    const { state } = useUser();

    useEffect(() => {
        !state.user.email && navigate('/');
    },[state.user.email]);

    return (
        <div className="container">
            <h2 className={style.title}>Mis datos</h2>
            <UserInfo 
                email={state.user.email}
                name={state.user.name}
                cuit={state.user.cuit}
                phone={state.user.phone}
                address={state.user.address}
                postalCode={state.user.postalCode}
                city={state.user.city}
                state={state.user.state}
            />
        </div>
    )
};

export default MyAccount;