import React from "react";
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
    
    const handleFilterRubro = (e) => {
        dispatch(getSubFromRubName(e.target.value));
        setCurrentPage(1);
    }
    const handleFilterRubro2 = (e) => {
        dispatch(filterByRubroDB(e.target.value));
        setCurrentPage(1);
    }

    return (
        <Container>
            <header className="text-center my-4">
                <h3><strong>PÁGINA DE PRODUCTOS</strong></h3>
            </header>
            <Filters handleFilterRubro={handleFilterRubro} handleFilterRubro2={handleFilterRubro2}></Filters>
            <section>
                <Row>
                    <Col>
                        <CardContainer currenProducts={currentProducts} />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                        <PaginationComponent productPerPage={productPerPage} productsDB={productsDB.length} paginado={paginado} currentPage={currentPage}/>
                    </Col>
                </Row>
            </section>
        </Container>
    )
};

export default ProductsPage;