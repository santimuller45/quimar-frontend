import React from "react";
import { useEffect } from "react";
import style from "./OrdersPanel.module.css";

// REACT BOOSTRAP ---->
import { Accordion, Table } from "react-bootstrap";
// <-------------------

// CUSTOM HOOKS ------>
import { useOrders } from "../../customHooks/useOrders.js"
// <-------------------

// COMPONENTS -------->
import NavBarPanelOrders from "./NavBarPanelOrders/NavBarPanelOrders.jsx"
// <-------------------

const OrdersPanel = () => {

    const { orderState, getAllOrders } = useOrders();
    const allOrdersDB = orderState.orders || [];

    useEffect(() => {
        getAllOrders();
    },[])

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Pedidos</h2>
            <NavBarPanelOrders/>
            <Accordion>
                {
                    allOrdersDB.length > 0
                    ? allOrdersDB.map(orderList => (
                        <Accordion.Item eventKey={orderList?.id.toString()} key={orderList.id}>
                            <Accordion.Header><strong> {`Pedido #${orderList.id} ${orderList.user ? orderList.user.name : 'Desconocido'}`} </strong></Accordion.Header>
                            <Accordion.Body>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Cliente</h2>
                                    <h3 className={style.totalAmount}>{orderList.user.name}</h3>
                                    <h2 className={style.totalTitle}>Usuario</h2>
                                    <p>{orderList.user.email}</p>
                                </div>
                                <Table striped bordered hover variant="dark">
                                    <thead className="text-center">
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
                                            orderList.listaPedido?.map((item) => (
                                                <tr key={item.codigo} className="text-center">
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
                                    <h2 className={style.totalTitle}>Total</h2>
                                    <h3 className={style.totalAmount}>${orderList.totalAmount}</h3>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    : <div className={style.loading}>No hay pedidos en el registro</div>
                }
            </Accordion>
        </div>
    )
};

export default OrdersPanel;