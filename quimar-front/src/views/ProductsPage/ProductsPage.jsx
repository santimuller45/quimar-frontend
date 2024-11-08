import React from "react";
import style from './ProductsPage.module.css';
import { useState, useEffect } from "react";

// REACT BOOSTRAP ------>
import { Row, Col } from 'react-bootstrap';
// <---------------------

// COMPONENTS ----->
import { CardContainer, PaginationComponent, Filters, WhatsAppChat, LoadingComponent } from "../../components/indexComponents.js";
// <----------------

// CUSTOM HOOKS ---->
import { useProducts } from "../../customHooks/useProducts.js";
// <-----------------


const ProductsPage = () => {

    // SPINNER DE LOADING ----->
    const [loading, setLoading] = useState(true);
    // <-----
    const { productState, filterByRubro } = useProducts();
    
    const productsDB = productState.products || [];

    // Revisar el estado almacenado en localStorage (si existe)
    const storedPage = localStorage.getItem('currentPage') || 1;
    const [currentPage, setCurrentPage] = useState(Number(storedPage));

    useEffect(() => {
        // Almacenar el número de página cada vez que cambie
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);
    
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
        } else {
            setLoading(true); // Mantener loading si no hay productos
        }
    }, [productState.products]);

    return (
        <div className="container-fluid">
            <Row>
                {loading ? (
                    <Col md={12}>
                        <LoadingComponent />
                    </Col>
                ) : (
                    <>
                        <Col md={3}>
                            <Filters handleFilterBySubRubro={handleFilterBySubRubro} />
                        </Col>
                        <Col md={9}>
                            <section>
                                <h2 className={style.mainTitle}><strong>Nuestros Productos</strong></h2>
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
                                <Row>
                                    <Col>
                                        <CardContainer currentProducts={currentProducts} />
                                    </Col>
                                </Row>
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
                            </section>
                        </Col>
                    </>
                )}
            </Row>
            <WhatsAppChat/>
        </div>
    )
};

export default ProductsPage;