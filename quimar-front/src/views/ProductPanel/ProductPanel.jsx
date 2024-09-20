import React from "react";
import style from './ProductPanel.module.css'
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Table, Button, Spinner } from "react-bootstrap";
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
import NavBarPanelProduct from "./NavBarPanelProduct/NavBarPanelProduct.jsx";
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
        if (!state.user.admin) navigate('/');
    },[state.user.admin, navigate]);

    const updateSubmitHandler = (product) => {
        setShow(true);
        setViewProduct(product);
    };

    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Productos</h2>
            <NavBarPanelProduct/>
            <Table striped bordered hover variant="dark" className={style.table}>
                <thead>
                    <tr className="text-center">
                        <th>Código</th>
                        <th>Detalle</th>
                        <th>Precio</th>
                        <th>Rubro</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    { productState.products?.length > 0 
                        ? 
                        (productState.products.map(product => (
                        <tr key={product.id} className="text-center">
                            <td>{product.codigo}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.status 
                                ? 
                                    <>
                                        <h6 style={{ color: 'green' }}>Activado</h6>
                                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }}/>
                                    </> 
                                : 
                                    <>
                                        <h6 style={{ color: 'red' }}>Desactivado</h6>
                                        <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }}/>
                                    </>
                                }
                            </td>
                            <td>
                                <Button onClick={() => updateSubmitHandler(product)} className={style.tableButtons} aria-label="modificar producto">
                                    <FontAwesomeIcon icon={faGear} />
                                </Button>
                            </td>
                        </tr>
                        )))   
                        : 
                        (<tr>
                            <td colSpan="7" className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </Spinner>
                            </td>
                        </tr>)
                    }
                </tbody>
                <ModifyProduct show={show} handleClose={handleClose} product={viewProduct}/>
            </Table>
        </div>
    );
};

export default ProductPanel;