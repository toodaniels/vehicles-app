
export default (values) => {
    const errors = {};
    const {email, password} = values;

    if (!email) {
        errors.email = 'Correo es requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!password) {
        errors.password = 'Contraseña es requerida';
    }

    return errors;
}