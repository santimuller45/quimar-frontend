import React from "react";
import { useEffect, useState } from "react";

// REACT BOOSTRAP ----->
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
// <--------------------

// COMPONENTS --------->
import { useProducts } from "../../../customHooks/useProducts.js";
// <--------------------

const ModifyRubro = ({ showModifyRubros, handleCloseModifyRubros, rubro }) => {
    const { productState } = useProducts();

    const [form, setForm] = useState({
        name: "",
        subRubro: []
    });

    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name.startsWith("subRubro")) {
            const index = Number(name.split("-")[1]);
            const newSubRubros = [...form.subRubro];
            newSubRubros[index] = value;
            setForm({ ...form, subRubro: newSubRubros });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAddSubRubro = () => {
        setForm({ ...form, subRubro: [...form.subRubro, ""] });
    };

    const handleRemoveSubRubro = (index) => {
        const newSubRubros = form.subRubro.filter((_, i) => i !== index);
        setForm({ ...form, subRubro: newSubRubros });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your submit logic here
        console.log(form);
    };

    useEffect(() => {
        if (rubro) {
            setForm({
                name: rubro.name || "",
                subRubro: rubro.subRubro || []
            });
        }
    }, [productState, rubro]);

    return (
        <Modal show={showModifyRubros} onHide={handleCloseModifyRubros}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Rubro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="modify-rubro-form">
                    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                        <Form.Label column sm="3">Nombre del Rubro</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                placeholder="Nombre"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Label column sm="12">Sub rubros</Form.Label>
                    {form.subRubro.map((sub, index) => (
                        <Form.Group as={Row} className="mb-3" controlId={`formBasicSubrubro-${index}`} key={index}>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Subrubro"
                                    name={`subRubro-${index}`}
                                    value={sub}
                                    onChange={handleInputChange}
                                />
                            </Col>
                            <Col sm="4">
                                <Button variant="danger" onClick={() => handleRemoveSubRubro(index)}>Eliminar</Button>
                            </Col>
                        </Form.Group>
                    ))}
                    <Button variant="secondary" onClick={handleAddSubRubro} className="mb-2">
                        Agregar Subrubro
                    </Button>
                    <Button type="submit" className="mt-3">Crear Rubro</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModifyRubro;