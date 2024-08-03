import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

// COMPONENTS ----->
import CardContainer from "../../components/CardContainer/CardContainer.jsx";
import PaginationComponent from "../../components/Pagination/PaginationComponent.jsx";
// <----------------

// REACT BOOSTRAP ------>
import { Container, Row, Col } from 'react-bootstrap';
// <---------------------

const ProductsPage = () => {

    const allProductsDB = useSelector(state => state.allProducts);

    // const [loading , setLoading] = useState(false);
    const [currentPage , setCurrentPage ] = useState(1);
    const productPerPage = 12;
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = allProductsDB.slice( indexOfFirstProduct, indexOfLastProduct );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const handleOrder = (e) => {
    //     dispatch(orderCards(e.target.value));
    //     setCurrentPage(1);
    // };

    // const handleSource = (e) => {
    //     dispatch(filterSource(e.target.value));
    //     setCurrentPage(1);
    // };

    // const handleType = (e) => {
    //     dispatch(filterType(e.target.value));
    //     setCurrentPage(1);
    // }

    // const reloadPage = () => {
    //     setLoading(true);
    //     dispatch(getPokemons());
    //     setCurrentPage(1);
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 5500);
    // }

    return (
        <Container>
            <header className="text-center my-4">
                <h3><strong>PÁGINA DE PRODUCTOS</strong></h3>
            </header>
            <section>
                <Row>
                    <Col>
                        <CardContainer currenProducts={currentProducts} />
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                        <PaginationComponent productPerPage={productPerPage} allProductsDB={allProductsDB.length} paginado={paginado} currentPage={currentPage}/>
                    </Col>
                </Row>
            </section>
        </Container>
    )
};

export default ProductsPage;