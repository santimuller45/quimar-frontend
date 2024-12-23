import React from "react";
import style from "./MyOrders.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP ---->
import { Row, Col } from "react-bootstrap";
// <-------------------

// CUSTOM HOOKS ---->
import { useUser } from "../../customHooks/useUser.js";
import { useOrders } from "../../customHooks/useOrders.js";
// <-----------------


// COMPONENTS ------>
import { OrdersUserDetail, PaginationComponent } from "../../components/indexComponents.js";
// <-----------------


const MyOrders = () => {

    const navigate = useNavigate();
    const { state } = useUser();
    const { getOrderByUser, orderState } = useOrders();
    const [ orders, setOrders ] = useState([]);

    const getOrdersFromUser = async () => {
        await getOrderByUser(state.user.userNumber);
    };

    // ESTADOS DE PAGINADO ------>
    const [currentPage , setCurrentPage ] = useState(1);
    const ordersPerPage = 20;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice( indexOfFirstOrder, indexOfLastOrder );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // <--------------------------

    useEffect(() => {
        if (!state.user.email) {
            navigate('/');
        } else {
            getOrdersFromUser();
        }
    },[state.user.email, navigate])

    // Añade un useEffect para actualizar el estado de orders cuando orderState.orders cambia
    useEffect(() => {
        setOrders(orderState.orders || []);
    }, [orderState.orders]);

    return (
        <div className={style.containerFluid}>
            <h2 className={style.title}>Mis Pedidos</h2>
            <OrdersUserDetail
                orderBody={currentOrders}
                user={state.user}
            />
            <Row className="justify-content-center mt-4">
                <Col xs="auto">
                    <PaginationComponent 
                        itemsPerPage={ordersPerPage} 
                        itemsDB={orders.length} 
                        paginado={paginado} 
                        currentPage={currentPage}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default MyOrders;