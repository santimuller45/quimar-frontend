import React from "react";
import { useState } from "react";
import style from './FilterByRubro.module.css';

// REACT BOOSTRAP ----->
import { Form, Row, Col } from "react-bootstrap";
// <--------------------

// CUSTOM HOOKS ------>
import { useProducts } from "../../customHooks/useProducts";
// <-------------------

const FilterByRubro = () => {

    const { filterByRubro, productState } = useProducts();
    const listRubros = productState.rubros;

    const [ input, setInput ] = useState(""); 

    // Manejo del cambio en el SELECT
    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setInput(selectedValue);
        filterByRubro(selectedValue)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterByRubro(input)
    };

    return (
        <Form onSubmit={handleSubmit} className={style.form}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicSubrubros">
                <Col className={style.labelCol}>
                    <Form.Label className={style.label}>Subrubros</Form.Label>
                </Col>
                <Col sm="9">
                    <Form.Select
                        aria-label="filtrar por subrubros"
                        name="input"
                        value={input}
                        onChange={handleSelectChange}
                        className={style.select}
                    >
                        <option value={"all"} className={style.select}>Todos</option>
                        {   listRubros.length > 0
                            ?
                            listRubros.map((rubro) => (
                                rubro.subRubro.map((sub,index) => (
                                    <option 
                                        key={index} 
                                        value={sub} 
                                        className={style.select}>
                                    {sub}
                                    </option>
                                ))
                            ))
                            : null
                        }
                    </Form.Select>
                </Col>
            </Form.Group>
        </Form>
    )
};

export default FilterByRubro;