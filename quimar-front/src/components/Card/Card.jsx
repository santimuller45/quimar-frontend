import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

//REACT-BOOSTRAP ----->
import { Card } from "react-bootstrap";
//<--------------------

const CardProduct = ({ id, codigo, name, price, imagen, category }) => {
    return (
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
                <Card.Text className={style.cardText}>Precio: <strong>${price}</strong></Card.Text>
                <button className={style.addButton}>Agregar al Pedido</button>
            </Card.Body>
        </Card>
)};

export default CardProduct;