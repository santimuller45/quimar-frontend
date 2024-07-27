import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"

// COMPONENTES ------->
import CardProduct from "../Card/Card.jsx";
// <-------------------

const CardContainer = () => {

//BORRADOR ------->
const [productos, setProductos] = useState([]);

const traerLosProductosPrueba = async () =>  {
    try {
        let resultado = await axios.get('/productos');
        setProductos(resultado.data);  // Establecer los datos en el estado
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

useEffect(() => {
    traerLosProductosPrueba();
},[])
//----------------<
    
    return (
        <div>
          {productos?.map((product,index) => (
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