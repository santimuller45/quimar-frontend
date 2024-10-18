import React from "react";
import style from './UserDetail.module.css';

// REACT-BOOSTRAP ------>
import { Form, Row, Col } from "react-bootstrap";
// <---------------------

const UserDetail = ({ email, name, cuit, phone, address, postalCode, city, state }) => {
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formEmail">
                    <Form.Label className={style.labelUserInfo}>Email</Form.Label>
                    <Form.Control type="email" value={email} className={style.userInfo} readOnly/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formName">
                    <Form.Label className={style.labelUserInfo}>Nombre</Form.Label>
                    <Form.Control type="text" value={name} className={style.userInfo} readOnly/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formCuit">
                    <Form.Label className={style.labelUserInfo}>CUIT</Form.Label>
                    <Form.Control type="text" value={cuit} className={style.userInfo} readOnly/>
                </Form.Group>
            <Form.Group as={Col} md="6" controlId="formPhone">
                    <Form.Label className={style.labelUserInfo}>Teléfono</Form.Label>
                    <Form.Control type="text" value={phone} className={style.userInfo} readOnly/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formAddress">
                    <Form.Label className={style.labelUserInfo}>Dirección</Form.Label>
                    <Form.Control type="text" value={address} className={style.userInfo} readOnly/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formPostalCode">
                    <Form.Label className={style.labelUserInfo}>Código Postal</Form.Label>
                    <Form.Control type="text" value={postalCode} className={style.userInfo} readOnly/>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formCity">
                    <Form.Label className={style.labelUserInfo}>Localidad</Form.Label>
                    <Form.Control type="text" value={city} className={style.userInfo} readOnly/>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formState">
                    <Form.Label className={style.labelUserInfo}>Provincia</Form.Label>
                    <Form.Control type="text" value={state} className={style.userInfo} readOnly/>
                </Form.Group>
            </Row>
        </Form>
    )
};

export default UserDetail;