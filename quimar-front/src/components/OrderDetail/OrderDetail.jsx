import React from "react";
import style from './OrderDetail.module.css';

// REACT BOOSTRAP ----->
import { Table, Button } from "react-bootstrap";
// <--------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const OrderDetail = ( { orderBody, isEditing, onRemove, setQuantity } ) => {

    const handleQuantityChange = (product, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 999) {
            setQuantity(product, newQuantity);
        }
    };

    return (
        <div className={style.container}>
            <Table striped bordered hover variant="dark" className={style.table}>
                <thead>
                    <tr className="text-center">
                        <th>Código</th>
                        <th>Detalle</th>
                        <th>Cantidad</th>
                        <th>Precio Unidad</th>
                        <th>Subtotal</th>
                        {   isEditing
                            ?
                            <th>Eliminar</th>
                            : null
                        }
                    </tr>
                </thead>
                <tbody>
                    { orderBody && orderBody.length > 0 ? (
                        orderBody.map((body) => (
                            <tr key={body.codigo} className="text-center">
                                <td>{body.codigo}</td>
                                <td>{body.name}</td>
                                {isEditing ? (
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            max="999"
                                            value={body.quantity}
                                            onChange={(e) => handleQuantityChange(body, Number(e.target.value))}
                                            className={style.quantityInput}
                                        />
                                    </td>
                                ) : (
                                    <td>{body.quantity}</td>
                                )}
                                <td>${body.price}</td>
                                <td>${body.total}</td>
                                {   isEditing
                                    ?
                                    <td>
                                        <Button onClick={() => onRemove(body)} aria-label="Eliminar producto" className={style.tableButtons}>
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </Button>
                                    </td>
                                    : null
                                }
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No hay detalles de pedido disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
};

export default OrderDetail;