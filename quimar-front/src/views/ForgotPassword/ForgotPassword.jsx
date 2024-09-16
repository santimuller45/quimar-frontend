import React, { useState } from "react";
import style from './ForgotPassword.module.css';
import { useNavigate } from "react-router-dom";


// REACT BOOSTRAP --------->
import { Button, Form, Row, Col } from "react-bootstrap";
// <------------------------

// SWEETALERT2 ---->
import Swal from 'sweetalert2';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const ForgotPassword = () => {

    // USO DE NAVEGACIÓN ---->
    const navigate = useNavigate();
    // <----------------

    const { updateUserPassword } = useUser();

    const [form, setForm] = useState({
        email: "",
        cuit: "",
    });

    const handlerInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const submitLoginHandler = async (e) => {
        e.preventDefault();

        try {
            await updateUserPassword(form);
            Swal.fire ({
                icon: 'success',
                title: '¡Usuario recuperado exitosamente! Ya puede ingresar nuevamente',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/log-in');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error al iniciar sesión'
            });
        }
    }

    return (
        <div className="container">
            <h2 className={style.title}>Recuperar cuenta</h2>
            <Form onSubmit={submitLoginHandler}>
                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail" className={style.container}>
                        <Form.Label className={style.label}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={form.email}
                            onChange={handlerInputChange}
                            className={style.text}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicCuit" className={style.container}>
                        <Form.Label className={style.label}>CUIT/CUIL</Form.Label>
                        <Form.Control
                            type="text"
                            name="cuit"
                            placeholder="Ingrese su CUIT/CUIL sin guiones ni puntos"
                            value={form.cuit}
                            onChange={handlerInputChange}
                            className={style.text}
                        />
                    </Form.Group>
                </Row>
                <div className={style.sendButton}>
                    <Button type="submit">Enviar</Button>
                </div>
            </Form>
        </div>
    )
};

export default ForgotPassword;