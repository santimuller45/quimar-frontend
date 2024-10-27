import React from "react";
import style from "./FilterByDate.module.css";
import { useState } from "react";

// REACT BOOSTRAP ----->
import { Form, Row, Col } from "react-bootstrap";
// <--------------------

//FONT-AWESOME ------->
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// <-------------------

// CUSTOM HOOKS ------>
import { useOrders } from "../../customHooks/useOrders.js";
// <-------------------

const FilterByDate = () => {

    const { filterOrderByDate } = useOrders();

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear + i); // Años desde ahora hasta 5 años en el futuro


    // Manejo del cambio en el SELECT
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        if (name === "day") setDay(value);
        if (name === "month") setMonth(value);
        if (name === "year") setYear(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (day && month && year) {
            filterOrderByDate( day, month, year );
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={style.form}>
            <Form.Group as={Row} className="mb-3" controlId="formBasicOrderByDate">
                <Row>
                    <Col className={style.labelCol}>
                        <Form.Label className={style.label}>Fecha</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Select
                            aria-label="filtrar por dia"
                            name="day"
                            value={day}
                            onChange={handleSelectChange}
                            className={style.select}
                        >
                            <option value={""} className={style.select}>DIA</option>
                            {   days.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col>
                        <Form.Select
                            aria-label="filtrar por mes"
                            name="month"
                            value={month}
                            onChange={handleSelectChange}
                            className={style.select}
                        >
                            <option value={""} className={style.select}>MES</option>
                            {   months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col>
                        <Form.Select
                            aria-label="filtrar por año"
                            name="year"
                            value={year}
                            onChange={handleSelectChange}
                            className={style.select}
                        >
                            <option value={""} className={style.select}>AÑO</option>
                            {   years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <button type="submit" className={style.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar</button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
};

export default FilterByDate;