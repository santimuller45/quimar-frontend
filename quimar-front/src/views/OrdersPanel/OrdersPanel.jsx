import React from "react";
import { useEffect } from "react";
import style from "./OrdersPanel.module.css";

// REACT BOOSTRAP ---->
import { Accordion, Table } from "react-bootstrap";
// <-------------------

// CUSTOM HOOKS ------>
import { useOrders } from "../../customHooks/useOrders.js"
// <-------------------

const OrdersPanel = () => {

    const { order, getAllOrders } = useOrders();

    useEffect(() => {
        getAllOrders();
    },[])

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Pedidos</h2>
            <Accordion>
                {
                    order.ordersPending.length > 0
                    ? order.ordersPending.map(elem => (
                        <Accordion.Item eventKey={elem.id.toString()} key={elem.id}>
                            <Accordion.Header>{`Pedido #${elem.id}`}</Accordion.Header>
                            <Accordion.Body>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Detalle</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                            <th>Comentarios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            elem.listaPedido?.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td>{item.codigo}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                    <td>{item.comentary}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Comentarios:</h2>
                                    <p>{elem.comentary ? elem.comentary : "No hay comentarios"}</p>
                                    <h2 className={style.totalTitle}>Total a pagar</h2>
                                    <h3 className={style.totalAmount}>${elem.totalAmount}</h3>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    : <div>No hay pedidos pendientes</div>
                }
            </Accordion>
        </div>
    )
};

export default OrdersPanel;