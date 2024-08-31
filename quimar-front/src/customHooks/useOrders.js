import { useContext } from "react";
import { OrdersContext } from "../context/Orders.jsx";

export const useOrders = () => {
    
    const context = useContext(OrdersContext);

    if (context === undefined) throw new Error('Error order shop');

    return context;
};