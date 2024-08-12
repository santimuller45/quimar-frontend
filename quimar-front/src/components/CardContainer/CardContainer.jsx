import React from "react";
import style from "./CardContainer.module.css";

// COMPONENTES ------->
import CardProduct from "../Card/Card.jsx";
// <-------------------

const CardContainer = ( {currenProducts} ) => {

    return (
        <div className={style.cardContainer}>
          {currenProducts?.map((product,index) => (
                <CardProduct 
                    key={index}
                    id={product.id}
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