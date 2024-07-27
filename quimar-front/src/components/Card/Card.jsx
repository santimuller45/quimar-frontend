import React from "react";
import { Link } from "react-router-dom";

//REACT-BOOSTRAP ----->

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//<--------------------

const CardProduct = ({ codigo, name, price, imagen, category, descripcion }) => {
    return (
        <Card className="d-flex flex-row mb-3">
            <Card.Img variant="top" src={imagen} alt={name} style={{ width: 'auto', height: '10rem', objectFit: 'cover' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title><strong>{name}</strong></Card.Title>
                <Card.Text>Código del producto: <strong>{codigo}</strong></Card.Text>
                <Card.Text>{descripcion}</Card.Text>
                <Card.Text>Subrubro: {category}</Card.Text>
                <Card.Text>Precio: <strong>${price}</strong></Card.Text>
                <Button variant="primary" className="align-self-start mt-auto" style={{ width: 'auto', fontSize: '0.8rem' }}>Agregar al Pedido</Button>
            </Card.Body>
        </Card>
)};

export default CardProduct;