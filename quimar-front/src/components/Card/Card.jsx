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

    const { id, codigo, name, price, imagen, category, status } = product;

    const { addToOrder } = useShop();
    const { state } = useUser();

    const [showAlert, setShowAlert] = useState(false);

    const handleAddToOrder = () => {
        addToOrder(product);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
    };

    return (
        <>
            <Card className={style.cardProduct}>
                <div className={style.imageContainer}>
                    <Link to={`/detail/${id}`}>
                        <Card.Img 
                            variant="top" 
                            src={imagen} 
                            alt={name} 
                            className={style.image}
                            />
                    </Link>
                </div>
                <Card.Body className={style.cardBody}>
                    <Card.Title className={style.cardTitle}><strong>{name}</strong></Card.Title>
                    <Card.Text className={style.cardText}>Código del producto: <strong>{codigo}</strong></Card.Text>
                    <Card.Text className={style.cardText}>Subrubro: {category}</Card.Text>
                    {   state.user.email
                        ?   <Card.Text className={style.cardText}>Precio: <strong>${price}</strong></Card.Text>
                        :   <Card.Text className={style.cardNoPrice}>
                                Debes <Link to="/log-in" className={style.cardLink}>iniciar sesión</Link> o <Link to="/register" className={style.cardLink}>registrarte</Link> para ver los precios.
                            </Card.Text>
                    }
                    { status === true
                        ? 
                            <Card.Text className={style.cardText}>Stock disponible 
                                <FontAwesomeIcon icon={faCircleCheck} className={style.cardStockSymbolCheck} style={{ color: 'green' }}/>
                            </Card.Text>
                        : 
                            <Card.Text className={style.cardText}>Stock disponible 
                                <FontAwesomeIcon icon={faCircleXmark} className={style.cardStockSymbolCross} style={{ color: 'red' }}/>
                            </Card.Text>
                    }
                    {   state.user.email && status === true
                        ?   <button className={style.addButton} onClick={handleAddToOrder}>Agregar al Pedido</button>
                        :   null
                    }
                </Card.Body>
            </Card>
            { showAlert && ( <CustomAlert message="¡Producto agregado al pedido! " onClose={() => setShowAlert(false)} type={true} /> )}
        </>
)};

export default CardProduct;