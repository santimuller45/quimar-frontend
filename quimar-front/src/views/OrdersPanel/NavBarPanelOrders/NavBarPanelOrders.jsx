import React from "react";
import style from "./NavBarPanelOrders.module.css";

// COMPONENTS ------>
import { PanelNavBar } from "../../../../components/indexComponents.js";
// <-----------------

const NavBarPanelOrders = () => {

    return (
        <PanelNavBar isOrderPanel={true}/>
    )
};

export default NavBarPanelOrders;