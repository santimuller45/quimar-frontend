import { useContext } from "react";
import { ShopContext } from "../context/Shop.jsx";

export const useShop = () => {
    
    const context = useContext(ShopContext);

    if (context === undefined) throw new Error('Error shop');

    return context;
};