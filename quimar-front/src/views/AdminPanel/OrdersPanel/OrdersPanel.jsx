import React from "react";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./OrdersPanel.module.css";

// REACT BOOSTRAP ---->
import { Row, Col } from "react-bootstrap";
// <-------------------

// CUSTOM HOOKS ------>
import { useOrders } from "../../../customHooks/useOrders.js";
import { useUser } from "../../../customHooks/useUser.js";
// <-------------------

// COMPONENTS -------->
import { PanelNavBar, PaginationComponent, OrdersUserDetail, LoadingComponent } from "../../../components/indexComponents.js";
// <-------------------

const OrdersPanel = () => {

    const navigate = useNavigate();
    const { orderState, getAllOrders } = useOrders();
    const { state } = useUser();
    const allOrdersDB = orderState.orders || [];

    // ESTADO DE LOADING -------->
    const [loading, setLoading] = useState(true);
    // <--------------------------
    
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
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    },[navigate, state.user.admin])

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Pedidos</h2>
            <PanelNavBar isOrderPanel={true}/>

            { loading && <LoadingComponent/> }

            {   currentOrders.length > 0
                ?
                currentOrders.map(orderList => (
                    <OrdersUserDetail
                        key={orderList.id}
                        orderBody={[orderList]}
                        user={orderList.user}
                    />
                ))
                : <p className={style.centeredMessage}>No hay pedidos disponibles</p>
            }

            
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