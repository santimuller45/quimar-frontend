import { useContext } from "react";
import { ShopContext } from "../context/Shop.jsx";

export const useOrder = () => {
    
    const context = useContext(ShopContext);

    if (context === undefined) throw new Error('Error order shop');

    return context;
};