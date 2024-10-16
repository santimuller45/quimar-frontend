import React from "react";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OrdersPanel.module.css";

// REACT BOOSTRAP ---->
import { Accordion, Row, Col } from "react-bootstrap";
// <-------------------

// CUSTOM HOOKS ------>
import { useOrders } from "../../../customHooks/useOrders.js";
import { useUser } from "../../../customHooks/useUser.js";
// <-------------------

// COMPONENTS -------->
import { PanelNavBar, PaginationComponent, OrderDetail } from "../../../components/indexComponents.js";
// <-------------------

const OrdersPanel = () => {

    const navigate = useNavigate();
    const { orderState, getAllOrders } = useOrders();
    const { state } = useUser();
    const allOrdersDB = orderState.orders || [];
    
    // ESTADOS DE PAGINADO ------>
    const [currentPage , setCurrentPage ] = useState(1);
    const ordersPerPage = 20;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = allOrdersDB.slice( indexOfFirstOrder, indexOfLastOrder );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // <--------------------------

    useEffect(() => {
        const fetchOrders = async () => {
            if (!state.user.admin) {
                navigate('/');
                return;
            }
    
            try {
                await getAllOrders();
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
    
        fetchOrders();
    },[navigate, state.user.admin])

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Pedidos</h2>
            <PanelNavBar isOrderPanel={true}/>
            <Accordion>
                {
                    currentOrders.length > 0
                    ? currentOrders.map(orderList => (
                        <Accordion.Item eventKey={orderList?.id.toString()} key={orderList.id}>
                            <Accordion.Header>
                                <strong>{`Pedido #${orderList.id} de: ${orderList.user ? orderList.user.name : 'Desconocido'}`}</strong>
                                {`Fecha: ${orderList.orderDate.day}/${orderList.orderDate.month}/${orderList.orderDate.year}`}
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Usuario N° {orderList.user.userNumber}</h2>
                                    <h3 className={style.totalAmount}>{orderList.user.name}</h3>
                                    <h2 className={style.totalTitle}>Fecha: {`${orderList.orderDate.day}/${orderList.orderDate.month}/${orderList.orderDate.year}`}</h2>
                                    <h2 className={style.totalTitle}>Hora: {`${orderList.orderDate.hour}:${orderList.orderDate.minute}:${orderList.orderDate.second}`}</h2>
                                    <br/>
                                </div>
                                {/* TABLA DE LA ORDEN */}
                                <OrderDetail orderBody={orderList.listaPedido}/>
                                {/*  */}
                                <div className={style.summaryContainer}>
                                    <h2 className={style.totalTitle}>Comentarios</h2>
                                    <p>{orderList.comentary ? orderList.comentary : "No hay comentarios"}</p>
                                    <h2 className={style.totalTitle}>Total del pedido</h2>
                                    <h3 className={style.totalAmount}>${orderList.totalAmount}</h3>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    : <div className={style.loading}>No hay pedidos en el registro</div>
                }
            </Accordion>
            <Row className="justify-content-center mt-4">
                <Col xs="auto">
                    <PaginationComponent 
                        itemsPerPage={ordersPerPage} 
                        itemsDB={allOrdersDB.length} 
                        paginado={paginado} 
                        currentPage={currentPage}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default OrdersPanel;