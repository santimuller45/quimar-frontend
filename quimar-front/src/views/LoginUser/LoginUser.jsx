import React from "react";
import style from './LoginUser.module.css';
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// REACT BOOSTRAP --------->
import { Button, Form, Row, Col } from "react-bootstrap";
// <------------------------

// SWEETALERT2 ---->
import Swal from 'sweetalert2';
// <-------------------

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

const LoginUser = () => {

    // USO DE NAVEGACIÓN ---->
    const navigate = useNavigate();
    // <----------------

    const { state, userLogin } = useUser();

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

    const submitLoginHandler = async (e) => {
        e.preventDefault();
        try {
            await userLogin(formLogin);
            Swal.fire ({
                icon: 'success',
                title: '¡Usuario logueado correctamente!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/account');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error al iniciar sesión'
            });
        }
    };

    useEffect(() => {
        state.user.email && navigate('/');
    },[state]);

    return (
        <div className={style.containerFluid}>
            <h2 className={style.title}>Iniciar Sesión</h2>
            <Form onSubmit={submitLoginHandler}>
                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail" className={style.container}>
                        <Form.Label className={style.label}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={formLogin.email}
                            onChange={handlerInputChange}
                            className={style.text}
                            />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicPassword" className={style.container}>
                        <Form.Label className={style.label}>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="CUIT/CUIL o Contraseña"
                            value={formLogin.password}
                            onChange={handlerInputChange}
                            className={style.text}
                            />
                    </Form.Group>
                </Row>
                <div className={style.sendButton}>
                    <Button type="submit" >Ingresar</Button>
                </div>
                <div className={style.linkGroup}>
                    <Link to={'/register'}>Registrarme</Link>
                    <Link to={'/forgot-password'}>Olvidé mi contraseña</Link>
                </div>
            </Form>
        </div>
    )
};

export default LoginUser;