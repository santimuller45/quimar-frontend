import React from "react";
import style from './OrderCheckout.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// REACT-BOOSTRAP ------>
import { Button, Table, Form } from "react-bootstrap";
// <---------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
import { useOrders } from "../../customHooks/useOrders.js";
// <----------------

const OrderCheckout = () => {

    const navigate = useNavigate();
    const { shop, totalOrderAmount, clearOrder } = useShop();
    const { setNewOrder } = useOrders();
    const { state } = useUser();
    const localUser = state.user || {};

    const enviarPedido = async () => {
        const pedido = {
            listaPedido: shop.map(elem => `codigo:${elem.codigo} cantidad:${elem.quantity} producto:${elem.name}`),
            amount: totalOrderAmount,
            totalAmount: totalOrderAmount,
            comentary: "ESTE ES UN COMENTARIO",
            orderStatus: "PENDIENTE",
            userEmail: localUser.email
        };
        await setNewOrder(pedido);
        clearOrder();
        navigate('/');
    }

    useEffect(() => {
        !localUser.email && navigate('/log-in');
    },[localUser])

    return (
        <div>
            <h1 className={style.title}>Datos</h1>
            <Table striped bordered hover variant="dark" responsive="lg">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>CUIT</th>
                        <th>Dirección</th>
                        <th>Localidad</th>
                        <th>Provincia</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{localUser.email}</td>
                        <td>{localUser.firstname}</td>
                        <td>{localUser.lastname}</td>
                        <td>{localUser.cuit}</td>
                        <td>{localUser.address}</td>
                        <td>{localUser.city}</td>
                        <td>{localUser.state}</td>
                        <td>{localUser.phone}</td>
                    </tr>
                </tbody>
            </Table>
            <h1 className={style.title}>Pedido</h1>
            <Table striped bordered hover variant="dark" responsive="lg">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {shop.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No hay productos en el carrito</td>
                        </tr>
                    ) : (
                        shop.map(elem => (
                            <tr className="text-center" key={elem.id}>
                                <td>{elem.codigo}</td>
                                <td>{elem.name}</td>
                                <td>{elem.quantity}</td>
                                <td>${elem.price}</td>
                                <td><strong>${elem.total}</strong></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comentarios para el pedido</Form.Label>
                    <Form.Control 
                        as="textarea" rows={3}
                    />
                </Form.Group>
            </Form>
            <div className={style.endButtons}>
                <Button variant="danger" onClick={() => navigate(-1)}>Volver</Button>
                <Button variant="success" onClick={enviarPedido}>Enviar</Button>
            </div>
        </div>
    );
};

export default OrderCheckout;