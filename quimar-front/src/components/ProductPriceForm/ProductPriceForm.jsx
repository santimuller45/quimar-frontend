import React from "react";
import { useEffect, useState } from "react";

// REACT BOOSTRAP ----->
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// <--------------------

// SWEET ALERT ----->
import Swal from 'sweetalert2';
// <-----------------

// CONTEXT ------>
import { useProducts } from "../../customHooks/useProducts.js";
// <--------------

const ProductPriceForm = ({ show, handleClose, products }) => {

    const { updatePriceProducts, getAllProducts } = useProducts();

    const [form, setForm] = useState({
        productsList: [],
        valueType: "",
        value: "",
    });

    useEffect(() => {
        if (products && products.length > 0) {
            setForm((prevForm) => ({
                ...prevForm,
                productsList: products,
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                productsList: [],
            }));
        }
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "value") {
            // Asegurar que el valor esté entre 0 y 100 y permitir decimales
            const parsedValue = parseFloat(value);
            if (value === "" || (parsedValue >= 0 && parsedValue <= 100)) {
                setForm((prevForm) => ({
                    ...prevForm,
                    [name]: value, // Guardar como cadena para permitir edición
                }));
            }
        } else {
            // Manejo general para otros campos
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            valueType: e.target.value,
        }));
    };

    const showSuccessMessage = (message) => {
        Swal.fire({
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (form && form.productsList.length > 0 && form.valueType && form.value) {
                await updatePriceProducts(form);
                showSuccessMessage('Precios Actualizados Correctamente!')

                 // Reiniciar el formulario
                setForm({
                    productsList: [],
                    valueType: "",
                    value: "",
                });

                handleClose();
                await getAllProducts();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:  error || error?.message || 'Error al procesar la solicitud'
            });
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>Actualizar Precios</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="12">Productos a modificar</Form.Label>
                        <Col sm="12">
                            {form.productsList.length > 0
                                ?
                                (form.productsList.map((product) => (
                                    <Form.Control
                                        key={product.id}
                                        value={`${product.codigo} - ${product.name}`}
                                        readOnly
                                        className="mb-2"
                                    />
                                )))
                                :
                                (<p>No hay productos seleccionados</p>)
                            }
                        </Col>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Aumentar/Disminuir</Form.Label>
                        <Form.Select
                            aria-label="Seleccione el tipo modificación"
                            name="valueType"
                            value={form.valueType}
                            onChange={handleSelectChange}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="aumentar">Aumentar</option>
                            <option value="disminuir">Disminuir</option>
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Valor en %</Form.Label>
                        <Form.Control
                            type="number"
                            name="value"
                            value={form.value}
                            onChange={handleInputChange}
                            placeholder="Ingrese el porcentaje (sin %)"
                            step="0.1"
                        />
                    </Form.Group>

                    <Button type="submit" disabled={!form.productsList.length || !form.valueType || !form.value}>
                        Actualizar Precios
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
};

export default ProductPriceForm;