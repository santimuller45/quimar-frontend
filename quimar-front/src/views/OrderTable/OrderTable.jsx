import React from "react";
import style from './OrderTable.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const OrderTable = () => {

    const navigate = useNavigate();
    const { shop, addToOrder, decrementQuantity, removeFromOrder, clearOrder, totalOrderAmount } = useShop();
    const { state } = useUser();

    const submitHandler = () => {
        if (!state.user.email ) navigate('/log-in');
        else navigate('/order-checkout');
    };

    useEffect(() => {
    },[state.user])
    

    return (
        <div className={style.container}>
            <h1 className={style.title}>Pedido</h1>
            <Table striped bordered hover variant="dark" className={style.table}>
                <thead>
                    <tr className="text-center">
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

            {/* TOTAL DEL PEDIDO */}
            <div className={style.summaryContainer}>
                <h2 className={style.totalTitle}>Total del Pedido</h2>
                <h3 className={style.totalAmount}>${totalOrderAmount}</h3>
                <br/>
                <p className="text-center"><strong>¡Revise su pedido antes de continuar!</strong></p>
            </div>

            {/* BOTONES */}
            <div className={style.endButtons}>
                <Button className={style.button} variant="danger" onClick={() => clearOrder()}>Limpiar pedido</Button>
                <Button className={style.button} variant="success" onClick={submitHandler}>Continuar</Button>
            </div>
        </div>
    );
};

export default OrderTable;