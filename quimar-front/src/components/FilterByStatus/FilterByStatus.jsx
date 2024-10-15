import React from "react";
import { useState } from "react";
import style from './FilterByStatus.module.css';

// REACT BOOSTRAP ----->
import { Form, Row, Col } from "react-bootstrap";
// <--------------------

// CUSTOM HOOKS ------>
import { useProducts } from "../../customHooks/useProducts.js";
import { useUser } from "../../customHooks/useUser.js";
// <-------------------

const FilterByStatus = ({ isProduct, isUser }) => {

    const { filterByProductStatus } = useProducts();
    const { filterByUserStatus } = useUser();
    const [ input, setInput ] = useState(""); 

    // Manejo del cambio en el SELECT
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setInput(selectedValue);

        if (isProduct) {
            filterByProductStatus(selectedValue);
        } else if (isUser) {
            filterByUserStatus(selectedValue);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isProduct) {
            filterByProductStatus(input);
        } else if (isUser) {
            filterByUserStatus(input);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={style.form}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicStatus">
                <Col className={style.labelCol}>
                    <Form.Label className={style.label}>Estado</Form.Label>
                </Col>
                <Col sm="9">
                    <Form.Select
                        aria-label={isProduct ? "Estado de los productos" : "Estado de los usuarios"}
                        name="input"
                        value={input}
                        onChange={handleSelectChange}
                        className={style.select}
                    >
                        <option value={"all"} className={style.select}>Todos</option>
                        <option value={"activo"} className={style.select}>Activados</option>
                        <option value={"inactivo"} className={style.select}>Desactivados</option>
                    </Form.Select>
                </Col>
            </Form.Group>
        </Form>
    )
};

export default FilterByStatus;