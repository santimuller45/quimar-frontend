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
        setProduct('');
        dispatch(getAllProductsDB());
    };

    return (
        <Form onSubmit={searchBoxHandler} className={style.searchForm}>
            <Row>
                <Col>
                    <div className={style.searchContainer}>
                        <Form.Control
                            name="product"
                            type="text"
                            placeholder="Buscar..."
                            className={style.searchInput}
                            value={product}
                            onChange={productHandler}
                        />
                        <Button type="submit" className={style.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                        <Button onClick={resetHandler} className={style.resetButton}><FontAwesomeIcon icon={faCircleXmark} /></Button>
                    </div>
                </Col>
            </Row>
        </Form>
    )
};

export default SearchBox;