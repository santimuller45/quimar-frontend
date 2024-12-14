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
  const [productQuantity, setProductQuantity] = useState(1);

  // FUNCIONES DE REDUCER
  const { state } = useUser();
  const { addToOrder } = useShop();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToOrder = () => {
    if (productQuantity > 0 && productQuantity <= 999) {
      addToOrder(product, productQuantity); // Pasar la cantidad
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      setProductQuantity(1); // Reiniciar la cantidad después de agregar
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 999) {
        setProductQuantity(newQuantity);
    }
  }

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
                { state.user.email && product.status === true && (
                  <div className={style.buttonGroup}>
                    <p className={style.price}>${product.price}</p>
                    <div className={style.inputGroup}>
                      <p className={style.cardText}><strong>Cantidad:</strong></p>
                      <input
                          type="number"
                          min="1"
                          max="999"
                          value={productQuantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          className={style.quantityInput}
                          placeholder="Cantidad"
                      />
                    </div>
                    <button className={style.addButton} onClick={handleAddToOrder}>Agregar al Pedido</button>
                  </div>
                )}
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