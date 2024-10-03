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
    const allPendingOrders = order.ordersPending || [];

    useEffect(() => {
        getAllOrders();
    },[])

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Pedidos</h2>
            <Accordion>
                {
                    allPendingOrders.length > 0
                    ? allPendingOrders.map(orderList => (
                        <Accordion.Item eventKey={orderList.id.toString()} key={orderList.id}>
                            <Accordion.Header>{`Pedido #${orderList.id}`}</Accordion.Header>
                            <Accordion.Body>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Cliente</h2>
                                    <h3 className={style.totalAmount}>{orderList.users[0].name}</h3>
                                    <h2 className={style.totalTitle}>Usuario</h2>
                                    <p>{orderList.users[0].email}</p>
                                </div>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Detalle</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderList.listaPedido?.map((item, index) => (
                                                <tr key={index} className="text-center">
                                                    <td>{item.codigo}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Comentarios</h2>
                                    <p>{orderList.comentary ? orderList.comentary : "No hay comentarios"}</p>
                                    <h2 className={style.totalTitle}>Total a pagar</h2>
                                    <h3 className={style.totalAmount}>${orderList.totalAmount}</h3>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    : <div className={style.loading}>No hay pedidos pendientes</div>
                }
            </Accordion>
        </div>
    )
};

export default OrdersPanel;