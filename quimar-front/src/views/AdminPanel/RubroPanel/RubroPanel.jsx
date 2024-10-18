import React from "react";
import style from "./RubroPanel.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP ----->
import { Accordion } from "react-bootstrap";
// <--------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOKS ------>
import { useProducts } from "../../../customHooks/useProducts.js";
import { useUser } from "../../../customHooks/useUser.js";
// <-------------------

// COMPONENTS -------->
import { PanelNavBar, RubroForm } from "../../../components/indexComponents.js";
// <-------------------

const RubroPanel = () => {

    const navigate = useNavigate();
    const { state } = useUser();
    const { productState } = useProducts();
    const rubros = productState.rubros || [];

    const [activeKey, setActiveKey] = useState(null);

    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key)
    };

    useEffect(() => {
        if (!state.user.admin) navigate('/');
    },[ state.user.admin, navigate, productState ])

    // CREO UN ESTADO PARA MOSTRAR O NO EL COMPONENTE AddRubro
    const [showCreateRubro, setShowCreateRubro] = useState(false);
    const handleCloseCreateRubro = () => setShowCreateRubro(false);
    const createRubroSubmitHandler = () => setShowCreateRubro(true);

    // CREO UN ESTADO PARA MOSTRAR O NO EL COMPONENTE ModifyRubros
    const [showModifyRubros, setShowModifyRubros] = useState(false);
    const [viewRubro, setViewRubro] = useState({});
    const handleCloseModifyRubros = () => setShowModifyRubros(false);
    const updateRubrosSubmitHandler = (rubro) => {
        setShowModifyRubros(true);
        setViewRubro(rubro);
    };


    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Rubros</h2>
            <PanelNavBar isRubroPanel={true} createRubroSubmitHandler={createRubroSubmitHandler}/>
            <Accordion activeKey={activeKey}>
                {rubros.length > 0 ? (
                    rubros.map((rubro) => (
                        <Accordion.Item key={rubro.id} eventKey={rubro.id}>
                            <Accordion.Header onClick={() => handleToggle(rubro.id)}>
                                <div className={style.accordionTitle}>
                                    <button className={style.tableButtons} onClick={() => updateRubrosSubmitHandler(rubro)}><FontAwesomeIcon icon={faCirclePlus} /></button>
                                    <h6 className={style.subItem}>{rubro.name}</h6>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {rubro.subRubro.length > 0 ? (
                                    rubro.subRubro.map((sub, index) => (
                                        <div key={index} className={style.subItem}> {sub} </div>
                                    ))
                                ) : (
                                    <p>No hay subrubros disponibles</p>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                ))
                ) : (
                    <p>No hay rubros disponibles.</p>
                )}
            </Accordion>
            {/* MODAL PARA AGREGAR NUEVO RUBRO */}
            <RubroForm
                show={showCreateRubro}
                handleClose={handleCloseCreateRubro}
            />
            {/* MODAL PARA MODIFICAR LOS RUBROS */}
            <RubroForm
                show={showModifyRubros}
                handleClose={handleCloseModifyRubros}
                rubro={viewRubro}
                isEditing={true} 
            />
        </div>
    )
};

export default RubroPanel;