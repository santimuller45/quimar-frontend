import React from "react";
import style from "./CardContainer.module.css";

// COMPONENTES ------->
import CardProduct from "../Card/Card.jsx";
// <-------------------

const CardContainer = ( { currentProducts } ) => {

    return (
        <div className={style.cardContainer}>
          {currentProducts?.map((product,index) => (
                <CardProduct 
                    key={index}
                    id={product.id}
                    codigo={product.codigo}
                    name={product.name}
                    imagen={product.imagen}
                    descripcion={product.descripcion}
                    price={product.price}
                    category={product.category}
                    status={product.status}
                />
            ))}
        </div>
    )
};

export default CardContainer;