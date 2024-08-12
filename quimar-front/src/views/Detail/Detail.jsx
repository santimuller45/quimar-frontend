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
        <div className={style.mainContainer}>
            <h1>Detail</h1>
            <h2>{product.name}</h2>
            <h4>{product.codigo}</h4>
            <h2>{product.price}</h2>
            <p>{product.descripcion}</p>
        </div>
    )
};

export default Detail;