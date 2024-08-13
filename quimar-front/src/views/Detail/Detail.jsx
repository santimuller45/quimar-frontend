import React from "react";
import style from './Detail.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const Detail = () => {

    const { productID } = useParams();
  const [product, setProduct] = useState({});

  const getProductById = async () => {
    try {
      const result = (await axios(`/productos/${productID}`)).data;
      if (result) {
        setProduct(result);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    getProductById();
  }, [productID]);

    return (
      <div className={style.detailContainer}>
            <div className={style.imageSection}>
                <img 
                    src={product.imagen} 
                    alt={product.name} 
                    className={style.productImage}
                />
            </div>
            <div className={style.detailsSection}>
                <h1 className={style.cardTitle}>{product.name}</h1>
                <p className={style.cardText}>Código del producto: <strong>{product.codigo}</strong></p>
                <p className={style.cardText}>Subrubro: {product.category}</p>
                <p className={style.price}>${product.price}</p>
                <button className={style.addButton}>Agregar al Pedido</button>
                <div className={style.descriptionSection}>
                    <h2 className={style.descriptionTitle}>Descripción del producto</h2>
                    <p className={style.descriptionText}>{product.descripcion}</p>
                </div>
            </div>
        </div>
    )
};

export default Detail;