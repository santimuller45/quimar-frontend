import React from "react";
import style from './OrderCheckout.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// REACT-BOOSTRAP ------>
import { Button, Form } from "react-bootstrap";
// <---------------------

// SWEETALERT2 ---->
import Swal from 'sweetalert2';
// <-------------------

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
import { useOrders } from "../../customHooks/useOrders.js";
// <----------------

// COMPONENTES ------>
import { UserDetail, OrderDetail } from "../../components/indexComponents.js";
// <------------------

const OrderCheckout = () => {

    const navigate = useNavigate();
    const { shop, totalOrderAmount, clearOrder } = useShop();
    const { setNewOrder } = useOrders();
    const { state } = useUser();

    const [comments, setComments] = useState(""); // Nuevo estado para comentarios

    const handleCommentsChange = (e) => {
        setComments(e.target.value); // Actualiza el estado con el valor del textarea
    };

    const enviarPedido = async () => {
        const pedido = {
            listaPedido: shop,
            amount: totalOrderAmount,
            totalAmount: totalOrderAmount,
            comentary: comments,
            orderStatus: "COMPLETADO",
            userEmail: state.user.email
        };
        
        try {
            await setNewOrder(pedido);
            Swal.fire ({
                icon: 'success',
                title: '¡Pedido enviado exitosamente!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                clearOrder();
                navigate('/');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error al enviar el pedido'
            });
        }

    };

    useEffect(() => {
        if (!state.user.email ) navigate('/log-in');
    },[state.user.email]);

    return (
        <div className="container">
            <h2 className={style.title}>Datos del cliente</h2>
            <UserDetail 
                email={state.user.email}
                name={state.user.name}
                cuit={state.user.cuit}
                phone={state.user.phone}
                address={state.user.address}
                postalCode={state.user.postalCode}
                city={state.user.city}
                state={state.user.state}
            />
            <h2 className={style.title}>Detalle del pedido</h2>

            {/* TABLA DE LA ORDEN */}
            <OrderDetail orderBody={shop} />
            {/*  */}
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={style.labelUserDetail}>Observación para el pedido</Form.Label>
                    <Form.Control 
                        as="textarea" rows={3}
                        value={comments}
                        onChange={handleCommentsChange}
                    />
                </Form.Group>
            </Form>

             {/* TOTAL DEL PEDIDO */}
            <div className={style.summaryContainer}>
                <h2 className={style.totalTitle}>Total a pagar</h2>
                <h3 className={style.totalAmount}>${totalOrderAmount}</h3>
            </div>
            {/*  */}

            <div className={style.endButtons}>
                <Button className={style.button} variant="danger" onClick={() => navigate(-1)}>Volver</Button>
                <Button className={style.button} variant="success" onClick={enviarPedido}>Enviar</Button>
            </div>
        </div>
    );
};

export default OrderCheckout;