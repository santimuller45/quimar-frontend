import React from "react";
import style from './ProductPanel.module.css'
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Table, Button } from "react-bootstrap";
// <------------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useProducts } from "../../customHooks/useProducts";
import { useUser } from "../../customHooks/useUser";
// <----------------

// COMPONENT ------->
import ModifyProduct from "./ModifyProduct/ModifyProduct.jsx";
// <-----------------

const ProductPanel = () => {

    const { productState } = useProducts();
    const { state } = useUser();
    const navigate = useNavigate();

    // CREO UN ESTADO PARA PASARLO AL COMPONENTE DE ModifyProduct
    const [viewProduct, setViewProduct] = useState({});
    // CREO UN ESTADO PARA MOSTRAR O NO EL COMPONENTE ModifyProduct
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        !state.user.admin && navigate('/');
    },[]);

    const updateSubmitHandler = (product) => {
        setShow(true);
        setViewProduct(product);
    };

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Productos</h2>
            <Table striped bordered hover variant="dark" className={style.table}>
                <thead>
                    <tr className="text-center">
                        <td>Código</td>
                        <td>Detalle</td>
                        <td>Precio</td>
                        <td>Rubro</td>
                        <td>Descripción</td>
                        <td>Estado</td>
                        <td>Modificar</td>
                    </tr>
                </thead>
                <tbody>
                    {productState.allProducts?.map((product, index) => (
                        <tr key={index} className="text-center">
                            <td>{product.codigo}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.status ? <FontAwesomeIcon icon={faCircleCheck}/> : <FontAwesomeIcon icon={faCircleXmark}/>}</td>
                            <td>
                                <Button onClick={() => updateSubmitHandler(product)} className={style.tableButtons} aria-label="modificar producto">
                                    <FontAwesomeIcon icon={faGear} />
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <ModifyProduct show={show} handleClose={handleClose} product={viewProduct}/>
            </Table>
        </div>
    );
};

export default ProductPanel;