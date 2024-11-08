import React from "react";
import style from "./FilterByDate.module.css";
import { useState, useEffect } from "react";

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

    const { filterOrderByDate, getDateForOrders } = useOrders();

    // ESTADOS PARA EL VALOR DEL SELECT
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    // FECHAS TRAIDAS DEL BACK PARA LAS ORDERS
    const [ daysDate, setDaysDate ] = useState([]);
    const [ monthsDate, setMonthsDate ] = useState([]);
    const [ yearsDate, setYearsDate ] = useState([]);

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
            setDay('DIA');
            setMonth('MES');
            setYear('AÑO');
        }
    };

    useEffect(() => {
        const fetchDates = async () => {
            try {
                const result = await getDateForOrders();
                if (result) {
                    setDaysDate(result.days);
                    setMonthsDate(result.months);
                    setYearsDate(result.years);
                }
            } catch (error) {
                console.log(error.message || "Error fetching dates");
            }
        }
        fetchDates();
    },[getDateForOrders])

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
                            {   daysDate.map(d => (
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
                            {   monthsDate.map(m => (
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
                            {   yearsDate.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </Form.Select>
                    </Col>
                    
                    <Col>
                        <button type="submit" className={style.searchButton}><FontAwesomeIcon icon={faMagnifyingGlass} /> Buscar</button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
};

export default FilterByDate;