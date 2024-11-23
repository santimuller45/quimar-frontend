import React from "react";
import style from "./RefreshComponent.module.css";

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOKS ----->
import { useProducts } from "../../customHooks/useProducts.js";
import { useUser } from "../../customHooks/useUser.js";
import { useOrders } from "../../customHooks/useOrders.js";
// <------------------

const RefreshComponent = ({ isProducts, isOrders, isUsers, isRubros }) => {

    const { getAllProducts, getAllRubros } = useProducts();
    const { getAllOrders } = useOrders();
    const { getAllUsers } = useUser();

    const handleRefresh = async () => {
        if (isProducts) {
            await getAllProducts();
        } else if (isOrders) {
            await getAllOrders();
        } else if (isUsers) {
            await getAllUsers();
        } else if (isRubros) {
            await getAllRubros();
        }
    };

    return (
        <button onClick={() => handleRefresh()} className={style.refreshButton}>
            <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
    )
};

export default RefreshComponent;