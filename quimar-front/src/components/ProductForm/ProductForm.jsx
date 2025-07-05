import { useState, useEffect } from "react";

// REACT BOOSTRAP ----->
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
// <--------------------

// CUSTOM HOOKS -------->
import { useProducts } from "../../customHooks/useProducts.js";
// <---------------------

// ---- COMPONENTS ----
import { LoadingComponent } from "../indexComponents.js";
// --------------------

// SWEET ALERT ----->
import Swal from "sweetalert2";
// <-----------------

// ---- VALIDATE ----
import { validateProduct } from "./validate.js";
// ------------------

const initialFormState = {
  id: "",
  codigo: "",
  name: "",
  price: "",
  imagenFile: null,
  imagenUrl: "",
  category: "",
  descripcion: "",
  status: false,
};

const ProductForm = ({ show, handleClose, product, isEditing }) => {
  const [loading, setLoading] = useState(false);

  const { productState, addProduct, updateProducts, getAllProducts } =
    useProducts();
  const rubros =
    productState?.rubros?.flatMap((elem) => elem?.subRubro || []) || [];

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (isEditing && product) {
      setForm({
        id: product.id || "",
        codigo: product.codigo || "",
        name: product.name || "",
        price: product.price || "",
        imagenFile: null,
        imagenUrl: product.imagen || "",
        category: product.category || "",
        descripcion: product.descripcion || "",
        status: product.status || false,
      });
    }
  }, [isEditing, product]);

  // Manejo del cambio en INPUTS
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Manejo del cambio en el SELECT
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Manejo del cambio en el CHECKBOX
  const handleCheckboxChange = (e) => {
    setForm({
      ...form,
      status: e.target.checked,
    });
  };

  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateProduct(form); // Validar el formulario

    // Validar que el formulario tenga valores seleccionados
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join("\n");
      return Swal.fire({
        icon: "warning",
        title: "Atención",
        text: errorMessages,
      });
    }

    if (
      form.imagen &&
      !["image/jpeg", "image/png", "image/webp"].includes(form.imagen.type)
    ) {
      return Swal.fire({
        icon: "error",
        title: "Tipo de archivo no válido",
        text: "Solo se permiten imágenes JPG, PNG o WEBP.",
      });
    }

    // SE DEBE CREAR EL FORMULARIO UTILIZANDO LA FUNCION FORMDATA PARA QUE SE PUEDA ENVIAR EL FORMULARIO CON LA IMAGEN AL BACK
    const data = new FormData();

    if (form.imagenFile instanceof File && form.imagenFile.size > 0) {
      data.append("imagen", form.imagenFile);
    } else if (form.imagenUrl?.trim()) {
      data.append("imagen", form.imagenUrl.trim());
    }

    Object.entries(form).forEach(([key, value]) => {
      if (
        !["imagenFile", "imagenUrl"].includes(key) &&
        value !== null &&
        value !== undefined
      ) {
        data.append(key, value);
      }
    });

    console.log("Contenido del FormData:");
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    setLoading(true);
    try {
      if (isEditing) {
        await updateProducts(data);
        showSuccessMessage("¡Producto actualizado correctamente!");
      } else {
        await addProduct(data);
        showSuccessMessage("¡Producto creado correctamente!");
      }

      // Reiniciar el formulario
      setForm(initialFormState);

      await getAllProducts();
      handleClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error || error?.message || "Error al procesar la solicitud",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Modificar Producto" : "Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formBasicCodigo">
            <Form.Label column sm="2">
              Código
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder={isEditing ? "Nuevo Codigo" : "Código del Producto"}
                name="codigo"
                value={form.codigo}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBasicName">
            <Form.Label column sm="2">
              Nombre
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder={isEditing ? "Nuevo Nombre" : "Nombre del Producto"}
                name="name"
                value={form.name}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
            <Form.Label column sm="2">
              Precio
            </Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder={isEditing ? "Nuevo Precio" : "Precio del Producto"}
                name="price"
                value={form.price}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Subrubros</Form.Label>
            <Form.Select
              aria-label="Seleccione el rubro"
              name="category"
              value={form.category}
              onChange={handleSelectChange}
            >
              <option value="">Seleccione un subrubro</option>
              {rubros?.map((elem, index) => (
                <option value={elem} key={index}>
                  {elem}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Descripción del producto</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              name="descripcion"
              value={form.descripcion}
              onChange={handleInputChange}
            />
          </Form.Group>
          {isEditing && product?.imagen && (
            <div className="text-center mb-3">
              <img
                src={product.imagen}
                alt="Imagen actual del producto"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <p style={{ fontSize: "0.9rem", color: "#666" }}>Imagen actual</p>
            </div>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccione la imagen para el producto</Form.Label>
            <Form.Control
              type="file"
              name="imagenFile"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formManualURL" className="mb-3">
            <Form.Label>O ingresar URL de imagen (opcional)</Form.Label>
            <Form.Control
              type="text"
              name="imagenUrl"
              value={form.imagenUrl}
              onChange={handleInputChange}
              placeholder="https://ik.imagekit.io/.../nombre.jpg"
            />
          </Form.Group>

          <Form.Group controlId="formBasicStatus" className="mb-3">
            <Form.Check
              label="Activar Producto"
              type="checkbox"
              checked={form.status}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Button type="submit">
            {isEditing ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
