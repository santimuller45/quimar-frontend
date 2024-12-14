import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

// COMPONENT ------->
import { CustomAlert } from "../indexComponents.js";
// <-----------------

// REACT-BOOSTRAP ----->
import { Card } from "react-bootstrap";
//<--------------------

// FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
// <-------------------

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const CardProduct = (product) => {

    // const { id, codigo, name, price, imagen, category, status } = product;

    const { addToOrder } = useShop();
    const { state } = useUser();

    const [showAlert, setShowAlert] = useState(false);
    const [productQuantity, setProductQuantity] = useState(1); // Estado para la cantidad

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 999) {
            setProductQuantity(newQuantity);
        }
    }

    const handleAddToOrder = () => {
        if (productQuantity > 0) {
            addToOrder(product, productQuantity)
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
            setProductQuantity(1);
        }
    };

    return (
        <>
            <Card className={style.cardProduct}>
                <div className={style.imageContainer}>
                    <Link to={`/detail/${product.id}`}>
                        <Card.Img 
                            variant="top" 
                            src={product.imagen} 
                            alt={product.name} 
                            className={style.image}
                        />
                    </Link>
                </div>
                <Card.Body className={style.cardBody}>
                    <Card.Title className={style.cardTitle}><strong>{product.name}</strong></Card.Title>
                    <Card.Text className={style.cardText}>Código del producto: <strong>{product.codigo}</strong></Card.Text>
                    <Card.Text className={style.cardText}>Subrubro: {product.category}</Card.Text>
                    {   state.user.email
                        ?   <Card.Text className={style.cardText}>Precio: <strong>${product.price}</strong></Card.Text>
                        :   <Card.Text className={style.cardNoPrice}>
                                Debes <Link to="/log-in" className={style.cardLink}>iniciar sesión</Link> o <Link to="/register" className={style.cardLink}>registrarte</Link> para ver los precios.
                            </Card.Text>
                    }
                    { product.status === true
                        ? 
                            <Card.Text className={style.cardText}>Stock disponible 
                                <FontAwesomeIcon icon={faCircleCheck} className={style.cardStockSymbolCheck} style={{ color: 'green' }}/>
                            </Card.Text>
                        : 
                            <Card.Text className={style.cardText}>Stock disponible 
                                <FontAwesomeIcon icon={faCircleXmark} className={style.cardStockSymbolCross} style={{ color: 'red' }}/>
                            </Card.Text>
                    }
                    {   state.user.email && product.status === true && (
                        <div className={style.buttonGroup}>
                            <div className={style.inputGroup}>
                                <Card.Text className={style.cardText}><strong>Cantidad:</strong></Card.Text>
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
                </Card.Body>
            </Card>
            { showAlert && ( <CustomAlert message="¡Producto agregado al pedido! " onClose={() => setShowAlert(false)} type={true} /> )}
        </>
)};

export default CardProduct;