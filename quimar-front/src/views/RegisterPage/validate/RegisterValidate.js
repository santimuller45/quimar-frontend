export default function registerValidate(input) {

    const errors = {};

    // REGEX ------->
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
    // <-------------

    if (!EMAIL_REGEX.test(input.email) && input.email.length > 0) errors.email = "El email es obligatorio.";
    if (!PASSWORD_REGEX.test(input.password) && input.password.length > 0) errors.password = "La contraseña debe tener al menos 1 letra mayúscula , 1 número y tener entre 8-20 caractéres";
    if (input.repeatPassword.length !== input.password.length || input.password !== input.repeatPassword) errors.repeatPassword = "Las contraseñas no coinciden.";
    if (!input.firstname) errors.firstname = "El nombre es obligatorio.";
    if (!input.lastname) errors.lastname = "El apellido es obligatorio.";
    if (!input.cuit) errors.cuit = "El CUIT/CUIL es obligatorio.";
    if (!input.address) errors.address = "La dirección es obligatoria.";
    if (!input.city) errors.city = "La localidad es obligatoria.";
    if (!input.state) errors.state = "La provincia es obligatoria.";
    if (!input.postalCode) errors.postalCode = "El código postal es obligatorio.";
    if (!input.confirm) errors.confirm = "Debe confirmar que los datos son correctos.";

    return errors;
}