import React, { useState, useEffect} from "react";

// REACT BOOSTRAP -------->
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// <-----------------------

// CUSTOM HOOK ---->
import { useProducts } from "../../../customHooks/useProducts.js";
// <----------------

// SWEETALERT2 ---->
import Swal from 'sweetalert2';
// <-------------------

const ModifyProduct = ({ show, handleClose, product }) => {

    const { productState, getAllProducts, updateProducts } = useProducts();
    const rubros = productState.rubros.flatMap(elem => elem?.subRubro || []);

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

        // SE DEBE CREAR EL FORMULARIO UTILIZANDO LA FUNCION FormData PARA QUE SE PUEDA ENVIAR EL FORMULARIO CON LA IMAGEN AL BACK
        const data = new FormData();
        Object.keys(form).forEach(key => {
            if (form[key] !== null && form[key] !== undefined) {
                data.append(key, form[key]);
            }
        });
        // <-----

        try {
            await updateProducts(data);
            Swal.fire ({
                icon: 'success',
                title: '¡Producto actualizado correctamente!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                handleClose();
                getAllProducts();
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
    },[product]);

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
        </div>
    )
};

export default ModifyProduct;