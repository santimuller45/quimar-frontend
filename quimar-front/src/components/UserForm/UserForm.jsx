import React, { useState, useEffect } from "react";

// REACT BOOSTRAP ----->
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// <--------------------

// CUSTOM HOOKS -------->
import { useUser } from "../../customHooks/useUser.js";
// <---------------------

// SWEET ALERT ----->
import Swal from 'sweetalert2';
// <-----------------

const UserForm = ({ show, handleClose, user, isEditing, isAdmin }) => {

    const { getAllUsers, updateUsers } = useUser();

    const [form, setForm] = useState({
        id: "",
        userNumber: "",
        email: "",
        name: "",
        cuit: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        userStatus: false,
        admin: false
    });

    useEffect(() => {
        if (isEditing && user) {
            setForm({
                id: user.id || "",
                userNumber: user.userNumber || "",
                email: user.email || "",
                name: user.name || "",
                cuit: user.cuit || "",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                postalCode: user.postalCode || "",
                phone: user.phone || "",
                userStatus: user.userStatus || false,
                admin: user.admin || false
            });
        }
    }, [isEditing, user]);

    // Manejo del cambio en INPUTS
    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setForm({
            ...form,
            [name] : value
        });
    };

    // Manejo del cambio en el CHECKBOX de userStatus
    const handleUserStatusChange = (e) => {
        setForm({
            ...form,
            userStatus: e.target.checked
        });
    };

    // Manejo del cambio en el CHECKBOX de admin
    const handleAdminChange = (e) => {
        setForm({
            ...form,
            admin: e.target.checked
        });
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
        console.log(form);
        try {
            if (isEditing) {
                await updateUsers(form);
                showSuccessMessage('¡Usuario actualizado correctamente!');
            } else {
                await registerUser(form);
                showSuccessMessage('¡Usuario creado correctamente!');
            }
            handleClose();
            getAllUsers();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:  error || error?.message || 'Error al procesar la solicitud'
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? "Modificar Usuario" : "Nuevo Usuario"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicCodigo">
                        <Form.Label column sm="2">N° de Usuario</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="userNumber"
                                value={form.userNumber}
                                readOnly={true}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Form.Label column sm="2">Email</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                placeholder={isEditing ? "Nuevo Email" : "Email del Usuario"}
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                        <Form.Label column sm="2">Nombre</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                placeholder={isEditing ? "Nuevo Nombre" : "Nombre del Usuario"}
                                name="name"
                                value={form.name}
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicCuit">
                        <Form.Label column sm="2">CUIT/CUIL</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                placeholder={isEditing ? "Nuevo CUIT/CUIL" : "CUIT/CUIL del Usuario"}
                                name="cuit"
                                value={form.cuit}
                                onChange={handleInputChange} 
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Dirección del Usuario</Form.Label>
                        <Form.Control
                            placeholder={isEditing ? "Nueva Dirección" : "Dirección del Usuario"}
                            name="address"
                            value={form.address}
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>Localidad del Usuario</Form.Label>
                        <Form.Control
                            placeholder={isEditing ? "Nueva Localidad" : "Localidad del Usuario"}
                            name="city"
                            value={form.city}
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicState">
                        <Form.Label>Provincia del Usuario</Form.Label>
                        <Form.Control
                            placeholder={isEditing ? "Nueva Provincia" : "Provincia del Usuario"}
                            name="state"
                            value={form.state}
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPostalCode">
                        <Form.Label>Código Postal del Usuario</Form.Label>
                        <Form.Control
                            placeholder={isEditing ? "Nuevo Código Postal" : "Código Postal del Usuario"}
                            name="postalCode"
                            value={form.postalCode}
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Teléfono del Usuario</Form.Label>
                        <Form.Control
                            placeholder={isEditing ? "Nuevo Teléfono" : "Teléfono del Usuario"}
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange} 
                        />
                    </Form.Group>
                    {/* CONTROLES DE ADMIN */}
                    {   isAdmin
                        ?
                        <>
                            {/* CHECKBOX DE ESTADO USER */}
                            <Form.Group controlId="formBasicStatus" className="mb-3">
                                <Form.Check
                                    label="Activar Usuario"
                                    type="checkbox"
                                    checked={form.userStatus}
                                    onChange={handleUserStatusChange}
                                    />
                            </Form.Group>
                            {/* CHECKBOX DE ADMIN USER */}
                            <Form.Group controlId="formBasicStatusAdmin" className="mb-3">
                                <Form.Check
                                    label="Activar Admin"
                                    type="checkbox"
                                    checked={form.admin}
                                    onChange={handleAdminChange}
                                    />
                            </Form.Group>
                        </>
                        : null

                    }
                    {/*  */}
                    <Button type="submit">{isEditing ? "Guardar Cambios" : "Crear Usuario"}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UserForm;