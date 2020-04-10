
export default (values) => {
    const errors = {};
    const {email, name, password, repeatPassword} = values;

    if (!email) {
        errors.email = 'Correo es requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!name) {
        errors.name = 'Nombre es requerido';
    }

    if (!password) {
        errors.password = 'Contraseña es requerida';
    }

    if (!repeatPassword) {
        errors.repeatPassword = 'La contraseña no coincide';
    } else if (password !== repeatPassword) {
        errors.repeatPassword = 'La contraseña no coincide';
    }

    return errors;
}