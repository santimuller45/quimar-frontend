export default function registerValidate(input) {

    const errors = {};

    // REGEX ------->
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // <-------------

    if (!EMAIL_REGEX.test(input.email) && input.email.length > 0) errors.email = "El email es obligatorio.";
    if (!input.name) errors.name = "El nombre es obligatorio.";
    if (!input.cuit) errors.cuit = "El CUIT/CUIL es obligatorio.";
    if (!Number(input.cuit)) errors.cuit = "El CUIT/CUIL no debe contener guiones.";
    if (!input.address) errors.address = "La dirección es obligatoria.";
    if (!input.city) errors.city = "La localidad es obligatoria.";
    if (!input.state) errors.state = "La provincia es obligatoria.";
    if (!input.postalCode) errors.postalCode = "El código postal es obligatorio.";
    if (!input.confirm) errors.confirm = "Debe confirmar que los datos son correctos.";

    return errors;
}