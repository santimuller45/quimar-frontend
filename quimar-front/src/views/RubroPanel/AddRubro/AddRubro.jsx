import React from "react";
import { useEffect, useState } from "react";

// REACT BOOSTRAP ----->
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
// <--------------------

// COMPONENTS --------->
import { useProducts } from "../../../customHooks/useProducts.js";
// <--------------------

const AddRubro = ({ showCreateRubro, handleCloseCreateRubro }) => {

    const { productState } = useProducts();

    const [form, setForm] = useState({
        name: "",
        subRubro: []
    })

    const handleInputChange = () => {};

    const handleSubmit = () => {};

    useEffect(() => {

    },[productState])

    return (
        <Modal show={showCreateRubro} onHide={handleCloseCreateRubro}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Rubro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                        <Form.Label column sm="2">Nombre del Rubro</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                placeholder="Nombre"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicSubrubro">
                        <Form.Label column sm="2">Sub rubros</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                placeholder="Subrubro"
                                name="subRubro"
                                value={form.subRubro}
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Button type="submit">Crear Rubro</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default AddRubro;