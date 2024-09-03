import React from "react";
import style from './OrderCheckout.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// REACT-BOOSTRAP ------>
import { Button, Table, Form, Row, Col } from "react-bootstrap";
// <---------------------

//FONT-AWESOME ------->
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
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
    const [comments, setComments] = useState(""); // Nuevo estado para comentarios

    const handleCommentsChange = (e) => {
        setComments(e.target.value); // Actualiza el estado con el valor del textarea
    };

    const enviarPedido = async () => {
        const pedido = {
            listaPedido: shop.map(elem => `codigo:${elem.codigo} cantidad:${elem.quantity} producto:${elem.name}`),
            amount: totalOrderAmount,
            totalAmount: totalOrderAmount,
            comentary: comments,
            orderStatus: "PENDIENTE",
            userEmail: localUser.email
        };
        await setNewOrder(pedido);
        clearOrder();
        navigate('/');
    };

    useEffect(() => {
        !localUser.email && navigate('/log-in');
    },[localUser]);

    return (
        <div className="container">
            <h2 className={style.title}>DATOS</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label className={style.labelUserInfo}>Email</Form.Label>
                        <Form.Control type="email" value={localUser.email} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formFirstname">
                        <Form.Label className={style.labelUserInfo}>Nombre</Form.Label>
                        <Form.Control type="text" value={localUser.name} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formCuit">
                        <Form.Label className={style.labelUserInfo}>CUIT</Form.Label>
                        <Form.Control type="text" value={localUser.cuit} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formAddress">
                        <Form.Label className={style.labelUserInfo}>Dirección</Form.Label>
                        <Form.Control type="text" value={localUser.address} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="formCity">
                        <Form.Label className={style.labelUserInfo}>Localidad</Form.Label>
                        <Form.Control type="text" value={localUser.city} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="formState">
                        <Form.Label className={style.labelUserInfo}>Provincia</Form.Label>
                        <Form.Control type="text" value={localUser.state} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formPhone">
                        <Form.Label className={style.userInfo}>Teléfono</Form.Label>
                        <Form.Control type="text" value={localUser.phone} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
            </Form>
            <h2 className={style.title}>DETALLE DEL PEDIDO</h2>
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
                    <Form.Label className={style.labelUserInfo} >Comentarios para el pedido</Form.Label>
                    <Form.Control 
                        as="textarea" rows={3}
                        value={comments}
                        onChange={handleCommentsChange}
                    />
                </Form.Group>
            </Form>
            <div className={style.endButtons}>
                <Button className={style.button} variant="danger" onClick={() => navigate(-1)}>Volver</Button>
                <Button className={style.button} variant="success" onClick={enviarPedido}>Enviar</Button>
            </div>
        </div>
    );
};

export default OrderCheckout;