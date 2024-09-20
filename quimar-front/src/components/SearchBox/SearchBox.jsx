import React from "react";
import style from './SearchBox.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOK ---->
import { useProducts } from "../../customHooks/useProducts.js";
// <----------------

// REACT BOOSTRAP
import { Form, Col, Row, Button } from 'react-bootstrap';
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// <-------------------

const SearchBox = ({ urlNavigate }) => {

    const [ product , setProduct ] = useState('');
    const { getProductByName, getAllProducts } = useProducts();
    const navigate = useNavigate();

    const productHandler = (e) => {
        setProduct(e.target.value);
    };

    const searchBoxHandler = async (e) => {
        e.preventDefault();
        navigate(urlNavigate);
        await getProductByName(product);
    };

    const resetHandler = async () => {
        setProduct('');
        await getAllProducts();
    };

    return (
        <Form onSubmit={searchBoxHandler} className={style.searchForm}>
            <Row>
                <Col>
                    <div className={style.searchContainer}>
                        <Form.Control
                            name="product"
                            type="text"
                            placeholder="Buscar producto..."
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