import React from "react";
import styles from './OrderTable.module.css';
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT-BOOSTRAP ------>
import { Button, Table } from "react-bootstrap";
// <---------------------

// CUSTOM HOOK ---->
import { useOrder } from "../../customHooks/useOrder.js";
// <----------------

const OrderTable = () => {

    const navigate = useNavigate();
    const { order, addToOrder, removeFromOrder, clearOrder, totalOrderAmount } = useOrder();

    return (
        <div className={styles.container}>
            <h1>Tabla de Pedido</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Subtotal</th>
                        <th>Agregar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    { order?.map(elem => (
                        <tr className="text-center" key={elem.id}>
                            <td>{elem.codigo}</td>
                            <td>{elem.name}</td>
                            <td>{elem.quantity}</td>
                            <td>${elem.price}</td>
                            <td><strong>${elem.total}</strong></td>
                            <td><Button variant="success" onClick={() => addToOrder(elem)}>+1</Button></td>
                            <td><Button variant="danger" onClick={() => removeFromOrder(elem)}>X</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td>${totalOrderAmount}</td>
                    </tr>
                </tbody>
            </Table>
            <div style={{display:"flex", justifyContent:"center", margin:"10px"}}>
                <Button variant="success" onClick={() => navigate(-1)}>Finalizar Pedido</Button>
                <Button variant="danger" onClick={() => clearOrder()}>Limpiar Pedido</Button>
            </div>
        </div>
    )
};

export default OrderTable;