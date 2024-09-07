import React from "react";
import { useState, useEffect } from "react";
import style from './LoginUser.module.css';
import { useNavigate, Link } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Button, Form, Row } from "react-bootstrap";
// <------------------------

// COMPONENT ------->
import { CustomAlert } from "../../components/indexComponents.js";

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const LoginUser = () => {

    // USO DE NAVEGACIÓN ---->
    const navigate = useNavigate();
    // <----------------

    // MANEJO DE ALERTAS ---->
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState(false);
    // <----------------------

    const { state ,userLogin } = useUser();

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });

    const handlerInputChange = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name] : e.target.value
        });
    };

    useEffect(() => {
        if (state.error) {
            setMessageAlert(state.error);
            setTypeAlert(false);
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            },3000)
        }
    }, [state.error]);

    const submitLoginHandler = async (e) => {
        e.preventDefault();
        // Limpiar errores anteriores antes de enviar el formulario
        setMessageAlert('');
        setTypeAlert(false);
    
        try {
            await userLogin(formLogin);
            // Verifica si hay un error en el estado después de intentar iniciar sesión
            if (state.error) {
                setMessageAlert(state.error);
                setTypeAlert(false); // Tipo de alerta para error
                setShowAlert(true);
            } else {
                setMessageAlert("¡Usuario logueado correctamente!");
                setTypeAlert(true); // Tipo de alerta para éxito
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/account');
                },2000);
            }
        } catch (error) {
            // Captura errores inesperados
            setMessageAlert(error.message || "Error desconocido");
            setTypeAlert(false); // Tipo de alerta para error
            setShowAlert(true);
        }
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>Iniciar Sesión</h2>
            <Form onSubmit={submitLoginHandler}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={style.label}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Ingrese email"
                        value={formLogin.email}
                        onChange={handlerInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.label}>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formLogin.password}
                        onChange={handlerInputChange}
                    />
                </Form.Group>

                <Row>
                    <Button type="submit">
                        Enviar
                    </Button>
                </Row>
                <Row><Link to={'/forgot-password'}>Olvidé mi contraseña</Link></Row>
            </Form>
            { showAlert && ( <CustomAlert message={messageAlert} onClose={() => setShowAlert(false)} type={typeAlert} /> )}
        </div>
    )
};

export default LoginUser;