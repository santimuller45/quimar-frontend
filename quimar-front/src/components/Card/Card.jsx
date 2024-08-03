import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

//REACT-BOOSTRAP ----->
import { Card, Button } from "react-bootstrap";
//<--------------------

const CardProduct = ({ codigo, name, price, imagen, category, descripcion }) => {
    return (
        <Card className={style.cardProduct}>
            <div className={style.imageContainer}>
                <Card.Img 
                    variant="top" 
                    src={imagen} 
                    alt={name} 
                    className={style.image} 
                />
            </div>
            <Card.Body className={style.cardBody}>
                <Card.Title><strong>{name}</strong></Card.Title>
                <Card.Text className={style.cardText}>Código del producto: <strong>{codigo}</strong></Card.Text>
                <Card.Text className={style.cardText}>{descripcion}</Card.Text>
                <Card.Text className={style.cardText}>Subrubro: {category}</Card.Text>
                <Card.Text className={style.cardText}>Precio: <strong>${price}</strong></Card.Text>
                <Button variant="primary" className={style.addButton}>Agregar al Pedido</Button>
            </Card.Body>
        </Card>
)};

export default CardProduct;