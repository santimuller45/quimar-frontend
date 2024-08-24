import { useContext } from "react";
import { ProductContext } from "../context/Products.jsx";

export const useProducts = () => {
    
    const context = useContext(ProductContext);

    if (context === undefined) throw new Error('Error products');

    return context;
};