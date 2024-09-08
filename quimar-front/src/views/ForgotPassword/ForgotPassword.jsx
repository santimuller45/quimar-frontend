import React, { useState } from "react";
import style from './ForgotPassword.module.css';
import { useNavigate } from "react-router-dom";


// REACT BOOSTRAP --------->
import { Button, Form, Row, Col } from "react-bootstrap";
// <------------------------

// COMPONENT ------->
import { CustomAlert } from "../../components/indexComponents.js";
// <-----------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const ForgotPassword = () => {

    // USO DE NAVEGACIÓN ---->
    const navigate = useNavigate();
    // <----------------

    // MANEJO DE ALERTAS ---->
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState(false);
    // <----------------------

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
        setMessageAlert('');
        setTypeAlert(false);

        try {
            await updateUserPassword(form);
            setMessageAlert("¡Usuario recuperado exitosamente! Ya puede ingresar nuevamente");
            setTypeAlert(true);
            setShowAlert(true);
            setTimeout(() => {
                navigate('/log-in');
            }, 1000);
        } catch (error) {
            setMessageAlert(error);
            setTypeAlert(false);
            setShowAlert(true);
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
            { showAlert && ( <CustomAlert message={messageAlert} onClose={() => setShowAlert(false)} type={typeAlert} /> )}
        </div>
    )
};

export default ForgotPassword;