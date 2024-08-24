import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './RegisterPage.module.css';

// REACT BOOSTRAP --------->
import { Button, Form, Row, Col } from "react-bootstrap";
// <------------------------

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
        password: "",
        repeatPassword: "",
        firstname: "",
        lastname: "",
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

    const handlerSubmitRegister = (e) => {
        e.preventDefault();
        registerUser(formData);
        navigate('/');
    };


    return (
        <div className={style.container}>
            <h2 className={style.title}>Registro de Usuario</h2>
            <Form onSubmit={handlerSubmitRegister} noValidate>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={style.label}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingrese email"
                        value={formData.email}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label}>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
                    <Form.Label className={style.label}>Repetir Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="repeatPassword"
                        placeholder="Repetir Contraseña"
                        value={formData.repeatPassword}
                        onChange={handlerInputChange}
                        isInvalid={!!errors.repeatPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.repeatPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label className={style.label}>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstname"
                                placeholder="Ingrese su nombre"
                                value={formData.firstname}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.firstname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstname}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLastname">
                            <Form.Label className={style.label}>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                placeholder="Ingrese su apellido"
                                value={formData.lastname}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.lastname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastname}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label className={style.label}>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Ingrese su número de teléfono"
                                value={formData.phone}
                                onChange={handlerInputChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCuit">
                            <Form.Label className={style.label}>CUIT/CUIL</Form.Label>
                            <Form.Control
                                type="text"
                                name="cuit"
                                placeholder="Ingrese su CUIT/CUIL"
                                value={formData.cuit}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.cuit}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.cuit}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label className={style.label}>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Ingrese su dirección"
                                value={formData.address}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.address}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCP">
                            <Form.Label className={style.label}>Código Postal</Form.Label>
                            <Form.Control
                                type="number"
                                name="postalCode"
                                placeholder="Ingrese su código postal"
                                value={formData.postalCode}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.postalCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.postalCode}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicCity">
                            <Form.Label className={style.label}>Localidad</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="Ingrese su localidad"
                                value={formData.city}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.city}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.city}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicState">
                            <Form.Label className={style.label}>Provincia</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                placeholder="Ingrese su provincia"
                                value={formData.state}
                                onChange={handlerInputChange}
                                isInvalid={!!errors.state}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.state}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            name="confirm"
                            label="Confirmar"
                            checked={formData.confirm}
                            onChange={handlerInputChange}
                            isInvalid={!!errors.confirm}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirm}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" disabled={Object.keys(errors).length > 0}>
                        Enviar
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default RegisterPage;