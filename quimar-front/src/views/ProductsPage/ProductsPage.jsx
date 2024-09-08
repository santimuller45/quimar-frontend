import React from "react";
import style from './ProductsPage.module.css';
import { useState } from "react";

// COMPONENTS ----->
import { CardContainer, PaginationComponent, Filters } from "../../components/indexComponents.js";
// <----------------

// CUSTOM HOOKS ---->
import { useProducts } from "../../customHooks/useProducts.js";
// <-----------------

// REACT BOOSTRAP ------>
import { Row, Col } from 'react-bootstrap';
// <---------------------

const ProductsPage = () => {

    const { state, filterByRubro } = useProducts();
    
    const productsDB = state.products;

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

    return (
        <div className="container-fluid">
            <Row>
                <Col md={3}>
                    <Filters handleFilterBySubRubro={handleFilterBySubRubro}></Filters>
                </Col>
                <Col md={9}>
                    <section>
                        <h2 className={style.mainTitle}><strong>Nuestros Productos</strong></h2>
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
                    </section>
                </Col>
            </Row>
        </div>
    )
};

export default ProductsPage;