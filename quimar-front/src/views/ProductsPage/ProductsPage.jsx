import React from "react";
import style from './ProductsPage.module.css';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterByRubroDB, getSubFromRubName } from "../../redux/actions/actionsRubro.js";

// COMPONENTS ----->
import { CardContainer, PaginationComponent, Filters } from "../../components/indexComponents.js";
// <----------------

// REACT BOOSTRAP ------>
import { Container, Row, Col } from 'react-bootstrap';
// <---------------------

const ProductsPage = () => {

    const productsDB = useSelector(state => state.products);

    const [currentPage , setCurrentPage ] = useState(1);
    const productPerPage = 12;
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = productsDB.slice( indexOfFirstProduct, indexOfLastProduct );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const dispatch = useDispatch();
    
    const handleFilterBySubRubro = (name) => {
        dispatch(filterByRubroDB(name));
        setCurrentPage(1);
    };

    return (
        <Container fluid="lg">
            <Row>
                <Col md={3}>
                    <Filters handleFilterBySubRubro={handleFilterBySubRubro}></Filters>
                </Col>
                <Col md={9}>
                    <section>
                        <h3 className={style.mainTitle}><strong>NUESTROS PRODUCTOS</strong></h3>
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
        </Container>
    )
};

export default ProductsPage;