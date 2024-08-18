import React from "react";
import style from './OrderTable.module.css';
import { useNavigate } from "react-router-dom";

// REACT-BOOSTRAP ------>
import { Button, Table } from "react-bootstrap";
// <---------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useOrder } from "../../customHooks/useOrder.js";
// <----------------

const OrderTable = () => {

    const navigate = useNavigate();
    const { order, addToOrder, decrementQuantity, removeFromOrder, clearOrder, totalOrderAmount } = useOrder();

    return (
        <div className={style.container}>
            <h1 className={style.title}>Pedido</h1>
            <Table striped bordered hover variant="dark" className={style.table}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Subtotal</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {order.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No hay productos en el carrito</td>
                        </tr>
                    ) : (
                        order.map(elem => (
                            <tr className="text-center" key={elem.id}>
                                <td>{elem.codigo}</td>
                                <td>{elem.name}</td>
                                <td>
                                    <Button onClick={() => decrementQuantity(elem)} className={style.tableButtons} aria-label="Decrementar cantidad">
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    {elem.quantity} 
                                    <Button onClick={() => addToOrder(elem)} className={style.tableButtons} aria-label="Incrementar cantidad">
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </td>
                                <td>${elem.price}</td>
                                <td><strong>${elem.total}</strong></td>
                                <td>
                                    <Button onClick={() => removeFromOrder(elem)} className={style.tableButtons} aria-label="Eliminar producto">
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr className="text-center">
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center">
                        <td>${totalOrderAmount}</td>
                    </tr>
                </tbody>
            </Table>

            <div className={style.endButtons}>
                <Button variant="success" onClick={() => navigate(-1)}>Finalizar Pedido</Button>
                <Button variant="danger" onClick={() => clearOrder()}>Limpiar Pedido</Button>
            </div>
        </div>
    );
};

export default OrderTable;