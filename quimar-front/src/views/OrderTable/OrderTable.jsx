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
import { useShop } from "../../customHooks/useShop.js";
// <----------------

const OrderTable = () => {

    const navigate = useNavigate();
    const { shop, addToOrder, decrementQuantity, removeFromOrder, clearOrder, totalOrderAmount } = useShop();

    return (
        <div className={style.container}>
            <h1 className={style.title}>PEDIDO</h1>
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
                    {shop.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No hay productos en el carrito</td>
                        </tr>
                    ) : (
                        shop.map(elem => (
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

            <Table striped bordered hover variant="dark" size="sm">
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
                <Button className={style.button} variant="danger" onClick={() => clearOrder()}>Limpiar pedido</Button>
                <Button className={style.button} variant="success" onClick={() => navigate('/order-checkout')}>Continuar</Button>
            </div>
        </div>
    );
};

export default OrderTable;