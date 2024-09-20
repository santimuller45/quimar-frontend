import React from "react";
import style from './ProductsPage.module.css';
import { useState, useEffect } from "react";

// COMPONENTS ----->
import { CardContainer, PaginationComponent, Filters } from "../../components/indexComponents.js";
// <----------------

// CUSTOM HOOKS ---->
import { useProducts } from "../../customHooks/useProducts.js";
// <-----------------

// REACT BOOSTRAP ------>
import { Row, Col, Spinner } from 'react-bootstrap';
// <---------------------

const ProductsPage = () => {

    // SPINNER DE LOADING ----->
    const [loading, setLoading] = useState(true);
    // <-----
    const { productState, filterByRubro } = useProducts();
    
    const productsDB = productState.products;

    const [currentPage , setCurrentPage ] = useState(1);
    const productPerPage = 12;
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = productsDB.slice( indexOfFirstProduct, indexOfLastProduct );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleFilterBySubRubro = (name) => {
        filterByRubro(name);
        setCurrentPage(1);
    };

    // USAMOS EL USE EFFECT PARA VERIFICAR SI HAY PRODUCTOS EN EL REDUCER SINO USAMOS EL LOADING
    useEffect(() => {
        if (productState.products.length > 0) {
            setLoading(false); // Cambia a false cuando los productos estén cargados
        }
    }, [productState.products]);

    return (
        <div className="container-fluid">
            <Row>
                <Col md={3}>
                    <Filters handleFilterBySubRubro={handleFilterBySubRubro}></Filters>
                </Col>
                <Col md={9}>
                    <section>
                        <h2 className={style.mainTitle}><strong>Nuestros Productos</strong></h2>
                        {loading ? (
                            <Row className="justify-content-center mt-5">
                                <Col xs="auto">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </Spinner>
                                </Col>
                            </Row>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <CardContainer 
                                            currenProducts={currentProducts} 
                                        />
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mt-4">
                                    <Col xs="auto">
                                        <PaginationComponent 
                                            productPerPage={productPerPage} 
                                            productsDB={productsDB.length} 
                                            paginado={paginado} 
                                            currentPage={currentPage}
                                        />
                                    </Col>
                                </Row>
                            </>
                        )}
                    </section>
                </Col>
            </Row>
        </div>
    )
};

export default ProductsPage;