import React from "react";
import { useSelector } from "react-redux";

// COMPONENTES ------->
import CardProduct from "../Card/Card.jsx";
// <-------------------

const CardContainer = () => {

    const allProductsDB = useSelector(state => state.allProducts);

    return (
        <div>
          {allProductsDB?.map((product,index) => (
                <CardProduct 
                    key={index}
                    codigo={product.codigo}
                    name={product.name}
                    imagen={product.imagen}
                    descripcion={product.descripcion}
                    price={product.price}
                    category={product.category}
                />
            ))}
        </div>
    )
};

export default CardContainer;