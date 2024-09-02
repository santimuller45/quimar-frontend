import React from "react";
import style from "./MyAccount.module.css";

// CUSTOM HOOK ---->
import { useUser } from "../../customHooks/useUser.js";
// <----------------

// REACT-BOOSTRAP ------>
import { Form, Row, Col } from "react-bootstrap";
// <---------------------


const MyAccount = () => {

    const { state } = useUser();
    const localUser = state.user;

    return (
        <div className="container">
            <h2 className={style.title}>MI CUENTA</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formEmail">
                        <Form.Label className={style.labelUserInfo}>Email</Form.Label>
                        <Form.Control type="email" value={localUser.email} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formFirstname">
                        <Form.Label className={style.labelUserInfo}>Nombre</Form.Label>
                        <Form.Control type="text" value={localUser.firstname} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formLastname">
                        <Form.Label className={style.labelUserInfo}>Apellido</Form.Label>
                        <Form.Control type="text" value={localUser.lastname} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formCuit">
                        <Form.Label className={style.labelUserInfo}>CUIT</Form.Label>
                        <Form.Control type="text" value={localUser.cuit} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formAddress">
                        <Form.Label className={style.labelUserInfo}>Dirección</Form.Label>
                        <Form.Control type="text" value={localUser.address} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="formCity">
                        <Form.Label className={style.labelUserInfo}>Localidad</Form.Label>
                        <Form.Control type="text" value={localUser.city} className={style.userInfo} readOnly/>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="formState">
                        <Form.Label className={style.labelUserInfo}>Provincia</Form.Label>
                        <Form.Control type="text" value={localUser.state} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="formPhone">
                        <Form.Label className={style.userInfo}>Teléfono</Form.Label>
                        <Form.Control type="text" value={localUser.phone} className={style.userInfo} readOnly/>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
};

export default MyAccount;