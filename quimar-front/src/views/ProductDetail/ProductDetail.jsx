import React from "react";
import style from './ProductDetail.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// COMPONENT ------->
import { CustomAlert } from "../../components/indexComponents.js";
// <-----------------


const ProductDetail = () => {

  // DATOS DEL PRODUCTO
  const { productID } = useParams();
  const [product, setProduct] = useState({});

  // FUNCIONES DE REDUCER
  const { state } = useUser();
  const { addToOrder } = useShop();

  const [showAlert, setShowAlert] = useState(false);

  const handleAddToOrder = () => {
    addToOrder(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const getProductById = async () => {
    try {
      const result = (await axios(`/productos/${productID}`)).data;
      if (result) {
        setProduct(result);
      }
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  };

  useEffect(() => {
    getProductById();
  }, [productID, state.user.email]);

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
                { state.user.email
                  ?
                    <>
                      <p className={style.price}>${product.price}</p>
                      <button className={style.addButton} onClick={handleAddToOrder}>Agregar al Pedido</button>
                    </>
                  : null
                }
                <div className={style.descriptionSection}>
                    <h2 className={style.descriptionTitle}>Descripción del producto</h2>
                    <p className={style.descriptionText}>{product.descripcion}</p>
                </div>
            </div>
            { showAlert && ( <CustomAlert message="¡Producto agregado al pedido! " onClose={() => setShowAlert(false)} type={true} /> )}
        </div>
    )
};

export default ProductDetail;