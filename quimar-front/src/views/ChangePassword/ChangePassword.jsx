import React, { useState, useEffect } from "react";
import style from './ChangePassword.module.css';
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

const ChangePassword = () => {

    // USO DE NAVEGACIÓN ---->
    const navigate = useNavigate();
    // <----------------

    const { state, updateUserPassword } = useUser();

    const [form, setForm] = useState({
        email: "",
        password: "",
        newPassword: "",
    });

    const [showPasswords, setShowPasswords] = useState(false); // Estado para mostrar/ocultar contraseñas
    const [errors, setErrors] = useState({ password: false, newPassword: false }); // Estado para errores

    useEffect(() => {
        if (state.user.email) {
            setForm({
                ...form,
                email: state.user.email
            })
        } else navigate('/');
    },[state.user.email])

    const handlerInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
        // Limpia el error al escribir
        if (e.target.name === "password" || e.target.name === "newPassword") {
            setErrors({
                ...errors,
                [e.target.name]: false
            });
        }
    };

    const validateForm = () => {
        const newErrors = {
            password: !form.password,
            newPassword: !form.newPassword,
        };
        setErrors(newErrors);
        return !newErrors.password && !newErrors.newPassword;
    };

    const submitLoginHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Detiene el envío si hay errores

        try {
            await updateUserPassword(form);
            Swal.fire ({
                icon: 'success',
                title: '¡Constraseña actualizada correctamente',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/account');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error || 'Error al actualizar la contraseña'
            });
        }
    }

    return (
        <div className="container">
            <h2 className={style.title}>Cambiar Contraseña</h2>
            <Form onSubmit={submitLoginHandler}>
                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail" className={style.container}>
                        <Form.Label className={style.label}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Ingrese email"
                            value={form.email}
                            readOnly={true}
                            className={style.text}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicPassword" className={style.container}>
                        <Form.Label className={style.label}>Contraseña Actual</Form.Label>
                        <Form.Control
                            type={showPasswords ? "text" : "password"}
                            name="password"
                            placeholder="Ingrese su contraseña actual"
                            value={form.password}
                            onChange={handlerInputChange}
                            className={`${style.text} ${errors.password ? style.error : ""}`} // Aplicar clase de error
                        />
                        {errors.password && <Form.Text className="text-danger">Este campo es requerido.</Form.Text>}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="4" controlId="formBasicNewPassword" className={style.container}>
                        <Form.Label className={style.label}>Nueva Contraseña</Form.Label>
                        <Form.Control
                            type={showPasswords ? "text" : "password"}
                            name="newPassword"
                            placeholder="Ingrese nueva contraseña"
                            value={form.newPassword}
                            onChange={handlerInputChange}
                            className={`${style.text} ${errors.newPassword ? style.error : ""}`} // Aplicar clase de error
                        />
                        {errors.newPassword && <Form.Text className="text-danger">Este campo es requerido.</Form.Text>}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md="4" className={style.container}>
                        <Form.Check 
                            type="checkbox"
                            label="Mostrar contraseñas"
                            checked={showPasswords}
                            onChange={() => setShowPasswords(!showPasswords)} // Alterna el estado
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

export default ChangePassword;