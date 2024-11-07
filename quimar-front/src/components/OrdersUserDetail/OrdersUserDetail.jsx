import React from "react";
import style from './OrdersUserDetail.module.css';

// GENERADOR DE PDF ----->
import { generateOrderPDF } from "./generatePDF/generatePDF.js";
// <----------------------

// FONT-AWESOME -------> 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// REACT BOOSTRAP ---->
import { Accordion, Table, Button } from "react-bootstrap";
// <-------------------


const OrdersUserDetail = ({ orderBody= [], user= {} }) => {

    if (!Array.isArray(orderBody) || !user) {
        return <div>No hay información disponible.</div>;
    }

    const renderOrderDetails = (listaPedido) => {
        if (listaPedido && listaPedido.length > 0) {
            return listaPedido.map((body,index) => (
                <tr key={`${body.codigo}-${index}`} className="text-center">
                    <td>{body.codigo}</td>
                    <td>{body.name}</td>
                    <td>{body.quantity}</td>
                    <td>${body.price}</td>
                    <td>${body.total}</td>
                </tr>
            ));
        } else {
            return (
                <tr>
                    <td colSpan="5" className="text-center">No hay detalles de pedido disponibles.</td>
                </tr>
            );
        }
    };

    return (
        <div className="container-fluid">
            <Accordion>
            {   orderBody.length > 0 ? (
                    orderBody.map(order => (
                        <Accordion.Item eventKey={order.id.toString()} key={order.id}>
                            <Accordion.Header>
                                <div className={style.accordionHeader}>
                                    <div><strong>{`Pedido #${order.id}`}</strong></div>
                                    <div><strong>{`de: ${user.name || 'Desconocido'}`}</strong></div>
                                    <div>{` Fecha: ${order.orderDate.day}/${order.orderDate.month}/${order.orderDate.year}`}</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Usuario N° {user.userNumber}</h2>
                                    <h3 className={style.totalAmount}>{user.name}</h3>
                                    <h2 className={style.totalTitle}>Fecha: {`${order.orderDate.day}/${order.orderDate.month}/${order.orderDate.year}`}</h2>
                                    <h2 className={style.totalTitle}>Hora: {`${order.orderDate.hour}:${order.orderDate.minute}:${order.orderDate.second}`}</h2>
                                    <br />
                                </div>
                                <Table striped bordered hover variant="dark" className={style.table}>
                                    <thead>
                                        <tr className="text-center">
                                            <th>Código</th>
                                            <th>Detalle</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { renderOrderDetails(order.listaPedido) }
                                    </tbody>
                                </Table>
                                {/*  */}
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Observaciones para el pedido</h2>
                                    <p>{order.comentary ? order.comentary : "No hay comentarios"}</p>
                                    <h2 className={style.totalTitle}>Total del pedido</h2>
                                    <h3 className={style.totalAmount}>${order.totalAmount}</h3>
                                </div>
                                {/* Agregar el ícono para generar el PDF */}
                                <Button variant="primary" onClick={() => generateOrderPDF(order, user)}>
                                    <FontAwesomeIcon icon={faFilePdf} /> Generar PDF
                                </Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                ) : (
                    <Accordion.Item>
                        <Accordion.Header>No hay pedidos disponibles.</Accordion.Header>
                    </Accordion.Item>
                )}
            </Accordion>
        </div>
    )
};

export default OrdersUserDetail;