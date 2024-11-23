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
import { PaginationComponent, PanelNavBar, ProductForm } from "../../../components/indexComponents.js";
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

    // ESTADO DE SELECCIÓN DE PRODUCTOS PARA EL INCREMENTO O DECREMENTO DE PRECIO
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleCheckboxChange = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId) // Deseleccionar
                : [...prevSelected, productId] // Seleccionar
        );
        {console.log(selectedProducts)};
    };

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
                        <th>Subrubro</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Modificar</th>
                        <th>Seleccionar</th>
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
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleCheckboxChange(product.id)}
                                    />
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
                <ProductForm
                    show={showModifyProduct} 
                    handleClose={handleCloseModifyProduct} 
                    product={viewProduct} 
                    isEditing={true}  
                />
                {/* MODAL DE CREAR PRODUCTO */}
                <ProductForm
                    show={showCreateProduct} 
                    handleClose={handleCloseCreateProduct}
                />
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