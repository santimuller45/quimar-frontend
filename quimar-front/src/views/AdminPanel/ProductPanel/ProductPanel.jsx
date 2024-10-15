import React from "react";
import style from './ProductPanel.module.css'
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Table, Button, Spinner, Row, Col } from "react-bootstrap";
// <------------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOK ---->
import { useProducts } from "../../../customHooks/useProducts.js";
import { useUser } from "../../../customHooks/useUser.js";
// <----------------

// COMPONENT ------->
import ModifyProduct from "./ModifyProduct/ModifyProduct.jsx";
import AddProduct from "./AddProduct/AddProduct.jsx";
import { PaginationComponent, PanelNavBar } from "../../../components/indexComponents.js";
// <-----------------

const ProductPanel = () => {

    const { productState } = useProducts();
    const { state } = useUser();
    const navigate = useNavigate();

    // ESTADOS DE PAGINADO ------>
    const [currentPage , setCurrentPage ] = useState(1);
    const productsDB = productState.products;
    const productPerPage = 20;
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = productsDB.slice( indexOfFirstProduct, indexOfLastProduct );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    // <--------------------------

    // CREO ESTADOS PARA MOSTRAR O NO EL COMPONENTE ModifyProduct
    const [viewProduct, setViewProduct] = useState({});
    const [showModifyProduct, setShowModifyProduct] = useState(false);

    const handleCloseModifyProduct = () => setShowModifyProduct(false);
    
    const updateSubmitHandler = (product) => {
        setShowModifyProduct(true);
        setViewProduct(product);
    };

    // CREO UN ESTADO PARA MOSTRAR O NO EL COMPONENTE AddProduct
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    const handleCloseCreateProduct = () => setShowCreateProduct(false);
    const createProductSubmitHandler = () => setShowCreateProduct(true);

    useEffect(() => {
        if (!state.user.admin) navigate('/');
    }, [ state.user.admin, navigate, showModifyProduct, showCreateProduct, productState.products ]);


    return (
        <div className="container-fluid">
            <h2 className={style.title}>Panel de Productos</h2>
            <PanelNavBar isProductPanel={true} createProductSubmitHandler={createProductSubmitHandler} />
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
                    { currentProducts?.length > 0 
                        ? 
                        (currentProducts.map(product => (
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
                {/* MODAL DE MODIFICAR PRODUCTO */}
                <ModifyProduct showModifyProduct={showModifyProduct} handleCloseModifyProduct={handleCloseModifyProduct} product={viewProduct}/>
                {/* MODAL DE CREAR PRODUCTO */}
                <AddProduct showCreateProduct={showCreateProduct} handleCloseCreateProduct={handleCloseCreateProduct}/>
            </Table>
            <Row className="justify-content-center mt-4">
                <Col xs="auto">
                    <PaginationComponent 
                        itemsPerPage={productPerPage} 
                        itemsDB={productsDB.length} 
                        paginado={paginado} 
                        currentPage={currentPage}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default ProductPanel;