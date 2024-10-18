const validateProduct = (form) => {
    const errors = {};

    if (!form.codigo) {
        errors.codigo = 'El código es obligatorio.';
    }
    if (!form.name) {
        errors.name = 'El nombre es obligatorio.';
    }
    if (!form.price) {
        errors.price = 'El precio es obligatorio.';
    } else if (isNaN(form.price)) {
        errors.price = 'El precio debe ser un número válido.';
    }
    if (!form.category) {
        errors.category = 'Por favor seleccione un subrubro.';
    }
    if (!form.descripcion) {
        errors.descripcion = 'La descripción es obligatoria.';
    }

    return errors;
};

export { validateProduct };
