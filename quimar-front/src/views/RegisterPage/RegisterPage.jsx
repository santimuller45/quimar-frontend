import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './RegisterPage.module.css';

// REACT BOOSTRAP --------->
import { Button, Form, Col } from "react-bootstrap";
// <------------------------

// SWEETALERT2 ---->
import Swal from 'sweetalert2';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// VALIDATE JS ----->
import registerValidate from "./validate/RegisterValidate.js";
// <-----------------

const RegisterPage = () => {

    const navigate = useNavigate();
    const { registerUser } = useUser();

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        fantasyname: "",
        phone: "",
        cuit: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        confirm: false
    });

    const [errors, setErrors] = useState({});


    const handlerInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors(registerValidate({
            ...formData, 
            [e.target.name]: e.target.value
        }));

    };

    const handlerSubmitRegister = async (e) => {
        e.preventDefault();

        try {
            const registerForm = {
                email: formData.email,
                name: formData.name + (formData.fantasyname ? ` (${formData.fantasyname})` : ""),
                phone: formData.phone,
                cuit: formData.cuit,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                confirm: formData.confirm
            };
            await registerUser(registerForm);
            Swal.fire ({
                icon: 'success',
                title: '¡Usuario creado correctamente! Espere a que su cuenta sea activada',
                showConfirmButton: false,
                timer: 5000
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error registrar su cuenta'
            });
        }
    };

    return (
        <div className="container">
            <h2 className={style.title}>Registro de Usuario</h2>
            <Form onSubmit={handlerSubmitRegister} noValidate>
                <Form.Group as={Col} md="4" controlId="formBasicEmail" className={style.container}>
                    <Form.Label className={style.label}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingrese email"
                        value={formData.email}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.email}
                        className={style.text}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicName" className={style.container}>
                    <Form.Label className={style.label}>Apellido Nombre / Razón Social</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ingrese su nombre"
                        value={formData.name}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.name}
                        className={style.text}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formBasicFantasyName" className={style.container}>
                    <Form.Label className={style.label}>Nombre de fantasía - OPCIONAL</Form.Label>
                    <Form.Control
                        type="text"
                        name="fantasyname"
                        placeholder="Ingrese su nombre de fantasía"
                        value={formData.fantasyname}
                        onChange={handlerInputChange}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.fantasyname}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="formBasicPhone" className={style.container}>
                    <Form.Label className={style.label}>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        placeholder="Ingrese su número de teléfono"
                        value={formData.phone}
                        onChange={handlerInputChange}
                        className={style.text}
                    />
                </Form.Group>
                    
                <Form.Group as={Col} md="4" controlId="formBasicCuit" className={style.container}>
                    <Form.Label className={style.label}>CUIT/CUIL</Form.Label>
                    <Form.Control
                        type="text"
                        name="cuit"
                        placeholder="Ingrese su CUIT/CUIL"
                        value={formData.cuit}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.cuit}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.cuit}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="formBasicAddress" className={style.container}>
                    <Form.Label className={style.label}>Dirección Completa</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        placeholder="Ingrese su dirección calle y número"
                        value={formData.address}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.address}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address}
                    </Form.Control.Feedback>
                </Form.Group>
        
                <Form.Group as={Col} md="4" controlId="formBasicCP" className={style.container}>
                    <Form.Label className={style.label}>Código Postal</Form.Label>
                    <Form.Control
                        type="text"
                        name="postalCode"
                        placeholder="Ingrese su código postal"
                        value={formData.postalCode}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.postalCode}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.postalCode}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="4" controlId="formBasicCity" className={style.container}>
                    <Form.Label className={style.label}>Localidad</Form.Label>
                    <Form.Control
                        type="text"
                        name="city"
                        placeholder="Ingrese su localidad"
                        value={formData.city}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.city}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.city}
                    </Form.Control.Feedback>
                </Form.Group>
                    
                <Form.Group as={Col} md="4" controlId="formBasicState" className={style.container}>
                    <Form.Label className={style.label}>Provincia</Form.Label>
                    <Form.Control
                        type="text"
                        name="state"
                        placeholder="Ingrese su provincia"
                        value={formData.state}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.state}
                        className={style.text}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.state}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className={style.sendButton}>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            name="confirm"
                            label="Confirmar"
                            checked={formData.confirm}
                            onChange={handlerInputChange}
                            isInvalid={!!errors.confirm}
                            className={style.checkBox}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirm}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" disabled={Object.keys(errors).length > 0}>
                        Enviar
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default RegisterPage;