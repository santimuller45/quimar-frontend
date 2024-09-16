import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REACT BOOSTRAP -------->
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// <-----------------------

// CUSTOM HOOK ---->
import { useProducts } from "../../../customHooks/useProducts.js";
// <----------------

// COMPONENT ------->
import { CustomAlert } from "../../../components/indexComponents.js";
// <-----------------

const ModifyProduct = ({ show, handleClose, product }) => {

    const navigate = useNavigate();
    const { productState, updateProducts } = useProducts();
    const listRubros = productState.rubros;
    const rubros = listRubros.flatMap(elem => elem?.subRubro || []);

    // MANEJO DE ALERTAS ---->
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState(false);
    // <----------------------

    const [form, setForm] = useState({
        id: "",
        codigo: "",
        name: "",
        price: "",
        imagen: null,
        category: "",
        descripcion: "",
        status: false
    });

    // Manejo del cambio en inputs
    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, type, files } = e.target;
        setForm({
            ...form,
            [name]: type === 'file' ? files[0] : value
        });
    };

    // Manejo del cambio en el select
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageAlert('');
        setTypeAlert(false);

        try {
            await updateProducts(form);
            setMessageAlert("¡Producto actualizado correctamente!");
            setTypeAlert(true);
            setShowAlert(true);
            setTimeout(() => {
                handleClose
            }, 1000);
        } catch (error) {   
            setMessageAlert(error || 'Error al actualizar el producto');
            setTypeAlert(false);
            setShowAlert(true);
        }
    };

    // IMPORTANTE PARA ENVIAR LAS IMAGENES
    // Crea una instancia de FormData para enviar los datos
    // const formData = new FormData();
    // for (const key in form) {
    //     if (form.hasOwnProperty(key)) {
    //         formData.append(key, form[key]);
    //     }
    // }

    useEffect(() => {
        if (product) {
            setForm({
                id: product.id || "",
                codigo: product.codigo || "",
                name: product.name || "",
                price: product.price || "",
                imagen: null,
                category: product.category || "",
                descripcion: product.descripcion || "",
                status: product.status || false
            });
        }
    },[product])

    return (
        <div className="container">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Producto a modificar: {product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* CODIGO DEL PRODUCTO */}
                        <Form.Group as={Row} className="mb-3" controlId="formBasicCodigo">
                            <Form.Label column sm="2">Código</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        placeholder="Nuevo Codigo"
                                        name="codigo"
                                        value={form.codigo}
                                        onChange={handleInputChange} 
                                    />
                                </Col>
                        </Form.Group>
                            {/* NOMBRE DEL PRODUCTO */}
                            <Form.Group as={Row} className="mb-3" controlId="formBasicName">
                                <Form.Label column sm="2">Nombre</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        placeholder="Nuevo Nombre"
                                        name="name"
                                        value={form.name}
                                        onChange={handleInputChange} 
                                    />
                                </Col>
                            </Form.Group>
                            {/* PRECIO DEL PRODUCTO */}
                            <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
                                <Form.Label column sm="2">Precio</Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        placeholder="Nuevo Precio"
                                        name="price"
                                        value={form.price}
                                        onChange={handleInputChange} 
                                    />
                                </Col>
                            </Form.Group>
                            {/* CATEGORIA DEL PRODUCTO */}
                            <Form.Group controlId="formBasicCategory">
                                <Form.Label>Rubro</Form.Label>
                                <Form.Select
                                    aria-label="Seleccione el rubro"
                                    name="category"
                                    value={form.category}
                                    onChange={handleSelectChange}
                                >
                                    {rubros.map((elem, index) => (
                                        <option value={elem} key={index}>
                                            {elem}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {/* DESCRIPCION DEL PRODUCTO */}
                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Descripción del producto</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Nueva Descripción"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleInputChange} 
                                />
                            </Form.Group>
                            {/* IMAGEN DEL PRODUCTO */}
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Seleccione la imagen para el producto</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="imagen"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            {/* STATUS DEL PRODUCTO */}
                        
                        <Button type="submit">Guardar Cambios</Button>
                    </Form>
                </Modal.Body>
            </Modal>
            { showAlert && ( <CustomAlert message={messageAlert} onClose={() => setShowAlert(false)} type={typeAlert} /> )}
        </div>
    )
};

export default ModifyProduct;