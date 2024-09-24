import React from "react";
import style from "./RubroPanel.module.css";
import { useState, useEffect } from "react";

// REACT BOOSTRAP ----->
import { Accordion } from "react-bootstrap";
// <--------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOKS ------>
import { useProducts } from "../../customHooks/useProducts.js";
// <-------------------

// COMPONENTS -------->
import AddRubro from "./AddRubro/AddRubro.jsx";
import ModifyRubro from "./ModifyRubro/ModifyRubro.jsx";
import NavBarRubroPanel from "./NavBarRubroPanel/NavBarRubroPanel.jsx";
// <-------------------

const RubroPanel = () => {

    const { productState } = useProducts();
    const rubros = productState.rubros || [];

    const [activeKey, setActiveKey] = useState(null);

    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key)
    };

    useEffect(() => {

    },[productState])

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
        setViewRubro(rubro)
    }


    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Rubros</h2>
            <NavBarRubroPanel createRubroSubmitHandler={createRubroSubmitHandler}/>

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
            <AddRubro showCreateRubro={showCreateRubro} handleCloseCreateRubro={handleCloseCreateRubro}/>
            <ModifyRubro showModifyRubros={showModifyRubros} handleCloseModifyRubros={handleCloseModifyRubros} rubro={viewRubro}/>
        </div>
    )
};

export default RubroPanel;