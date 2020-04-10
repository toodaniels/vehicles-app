
export default (values) => {
    const errors = {};
    const {plate} = values;

    if (!plate) {
        errors.plate = 'La placa es requerida es requerida';
    }

    return errors;
}