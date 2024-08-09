import React from "react";
import style from './SearchBox.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductByNameDB, getAllProductsDB } from '../../redux/actions/actionsProduct.js';

// REACT BOOSTRAP
import { Form, Col, Row, Button } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const SearchBox = () => {

    const [ product , setProduct ] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productHandler = (e) => {
        e.preventDefault();
        setProduct(e.target.value);
    };

    const searchBoxHandler = (e) => {
        e.preventDefault();
        navigate('/products');
        if (product) dispatch(getProductByNameDB(product));
    };

    const resetHandler = () => {
        dispatch(getAllProductsDB());
    };

    return (
        <Form onSubmit={searchBoxHandler}>
            <Row>
                <Col xs="auto">
                    <Form.Control
                        name="product"
                        type="text"
                        placeholder="Buscar..."
                        className="mr-sm-2"
                        onChange={productHandler}
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit" variant="link"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                    <Button onClick={resetHandler} variant="link"><FontAwesomeIcon icon={faCircleXmark} /></Button>
                </Col>
            </Row>
        </Form>
    )
};

export default SearchBox;