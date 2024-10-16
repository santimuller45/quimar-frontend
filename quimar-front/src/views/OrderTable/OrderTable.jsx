import React from "react";
import style from './OrderTable.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// REACT-BOOSTRAP ------>
import { Button } from "react-bootstrap";
// <---------------------

// CUSTOM HOOK ---->
import { useShop } from "../../customHooks/useShop.js";
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// COMPONENTS ------->
import { OrderDetail } from "../../components/indexComponents.js";
// <------------------

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
            {/* TABLA DE LA ORDEN */}
            <OrderDetail
                orderBody={shop}
                isEditing={true}
                onAdd={addToOrder}
                onDecrement={decrementQuantity}
                onRemove={removeFromOrder}
            />
            {/* TOTAL DEL PEDIDO */}
            <div className={style.summaryContainer}>
                <h2 className={style.totalTitle}>Total del Pedido</h2>
                <h3 className={style.totalAmount}>${totalOrderAmount.toFixed(2)}</h3>
                <br/>
                <p className="text-center"><strong>¡Revise su pedido antes de continuar!</strong></p>
            </div>

            {/* BOTONES */}
            <div className={style.endButtons}>
                <Button 
                    className={style.button} 
                    variant="danger" 
                    onClick={() => clearOrder()}
                >Limpiar pedido
                </Button>
                <Button 
                    className={style.button} 
                    variant="success" 
                    onClick={submitHandler}
                    disabled={shop.length === 0} // Desactiva el botón si el carrito está vacío
                >
                Continuar
                </Button>
            </div>
        </div>
    );
};

export default OrderTable;