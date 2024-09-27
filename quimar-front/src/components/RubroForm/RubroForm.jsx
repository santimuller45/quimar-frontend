import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP ----->
import { Modal, Form, Col, Row, Button } from "react-bootstrap";
// <--------------------

// SWEET ALERT ----->
import Swal from 'sweetalert2';
// <-----------------

// COMPONENTS --------->
import { useProducts } from "../../customHooks/useProducts.js";
// <--------------------

const RubroForm = ({ show, handleClose, rubro, isEditing }) => {

    const navigate = useNavigate();
    const { productState, getAllRubros, addRubro, updateRubro } = useProducts();

    const [form, setForm] = useState({
        rubroID: "",
        name: "",
        subRubro: []
    })

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

    const showSuccessMessage = (message) => {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.name || form.subRubro.some(sub => !sub.trim())) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos.'
            });
            return;
        }

        try {
            if (isEditing) {
                await updateRubro(form);
                showSuccessMessage('Rubro actualizado correctamente!');
            } else {
                await addRubro(form);
                showSuccessMessage('Rubro creado correctamente!');
                setForm({ rubroID: "", name: "", subRubro: [] }); // Resetear
            }
            getAllRubros();
            handleClose();
            navigate('/rubro-panel');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:  error || error?.message || 'Error al procesar la solicitud'
            });
        }
    };

    useEffect(() => {
        if (isEditing && rubro) {
            setForm({
                rubroID: rubro.id || "",
                name: rubro.name || "",
                subRubro: rubro.subRubro || []
            });
        }
    },[productState, isEditing, rubro])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Modificar Rubro" : "Nuevo Rubro"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                        <Form.Label column sm="12">Rubro</Form.Label>
                        <Col sm="10">
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
                    <Row>
                        <Button variant="secondary" onClick={handleAddSubRubro} className="mt-2">
                            Agregar Subrubro
                        </Button>
                        <Button type="submit" className="mt-3">{isEditing ? "Guardar Cambios" : "Crear Rubro"}</Button>
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default RubroForm;