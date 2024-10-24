import React from "react";
import style from "./MyAccount.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// COMPONENTES ------->
import { UserDetail, UserForm } from "../../components/indexComponents.js";
// <-------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
// <-------------------


const MyAccount = () => {

    const navigate = useNavigate();
    const { state } = useUser();

    // CREO ESTADOS PARA MOSTRAR O NO EL COMPONENTE UserForm
    const [viewUser, setViewUser] = useState({});
    const [showModifyUser, setShowModifyUser] = useState(false);

    const handleCloseModifyUser = () => setShowModifyUser(false);
    
    const updateSubmitHandler = (user) => {
        setShowModifyUser(true);
        setViewUser(user);
        console.log(user)
    };

    useEffect(() => {
        !state.user.email && navigate('/');
    },[state.user.email]);

    return (
        <div className="container">
            <h2 className={style.title}>Mis datos</h2>
            <div className={style.groupButtons}>
                <button 
                    className={style.buttonItem} 
                    aria-label="editar-cuenta"
                    onClick={() => updateSubmitHandler(state.user)}
                >
                    <FontAwesomeIcon icon={faGear}/> Editar cuenta 
                </button>
            </div>
            <UserDetail 
                email={state.user.email}
                name={state.user.name}
                cuit={state.user.cuit}
                phone={state.user.phone}
                address={state.user.address}
                postalCode={state.user.postalCode}
                city={state.user.city}
                state={state.user.state}
            />
            {/* MODAL PARA MODIFICAR LOS DATOS DEL USUARIO */}
            <UserForm
                show={showModifyUser}
                handleClose={handleCloseModifyUser}
                user={viewUser}
                isEditing={true}
            />
            {/*  */}
        </div>
    )
};

export default MyAccount;