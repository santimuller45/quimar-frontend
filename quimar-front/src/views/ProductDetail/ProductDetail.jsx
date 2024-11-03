import React from "react";
import style from './ProductDetail.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
// <-------------------

// COMPONENT ------->
import { CustomAlert, LoadingComponent } from "../../components/indexComponents.js";
// <-----------------

const fetchUrl = import.meta.env.VITE_API_GET_PRODUCTS;

const ProductDetail = () => {

  // DATOS DEL PRODUCTO
  const { productID } = useParams();
  const [product, setProduct] = useState({});

  // FUNCIONES DE REDUCER
  const { state } = useUser();
  const { addToOrder } = useShop();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToOrder = () => {
    addToOrder(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const getProductById = async () => {
    try {
      const result = (await axios(`${fetchUrl}/${productID}`)).data;
      if (result) {
        setProduct(result);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById();
  }, [productID, state.user.email]);

    if (loading) return <LoadingComponent/>;
    if (error) return <p>Error: {error}</p>;

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
                { product.status === true
                    ? 
                      <p className={style.cardText}>Stock disponible 
                        <FontAwesomeIcon icon={faCircleCheck} className={style.cardStockSymbolCheck} style={{ color: 'green' }}/>
                      </p>
                    : 
                      <p className={style.cardText}>Stock disponible 
                        <FontAwesomeIcon icon={faCircleXmark} className={style.cardStockSymbolCross}/>
                      </p>
                }
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