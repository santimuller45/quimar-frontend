import React from "react";
import style from './OrderDetail.module.css';

// REACT BOOSTRAP ----->
import { Table, Button } from "react-bootstrap";
// <--------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const OrderDetail = ( { orderBody, isEditing, onAdd, onDecrement, onRemove } ) => {
    return (
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
                            {   isEditing
                                ?
                                <td>
                                    <Button onClick={() => onDecrement(body)} aria-label="Decrementar cantidad" className={style.tableButtons}>
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    {body.quantity} 
                                    <Button onClick={() => onAdd(body)} aria-label="Incrementar cantidad" className={style.tableButtons}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </td>
                                :
                                <td>{body.quantity}</td>
                            }
                            <td>${body.price.toFixed(2)}</td>
                            <td>${body.total.toFixed(2)}</td>
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
    )
};

export default OrderDetail;