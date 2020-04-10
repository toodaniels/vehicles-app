import React from 'react';
import { Formik } from 'formik';
import Input from '../Input';
import validate from './validate';
import { signUp } from '../../utils/fetch';

function Register(props) {
    const initialValues = { email: '', password: '', name: '', repeatPassword : '' };

    const onSubmit = async (values, { setSubmitting }) => {
        const { email, name, password } = values;
        const { gotoLogin, setAlertData } = props;
        const result  = await signUp(email, name, password);
        setSubmitting(false);
        setAlertData("alert-success", "Te registraste correctamente!");
        gotoLogin();
        return result;
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <div className="login">
                    <form onSubmit={handleSubmit}>
                        <h3> Registrarse </h3>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Correo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                        />
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name}
                            touched={touched.name}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                        />
                        <Input
                            type="password"
                            name="repeatPassword"
                            placeholder="Repetir Contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.repeatPassword}
                            error={errors.repeatPassword}
                            touched={touched.repeatPassword}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            <div>Registrarme</div>
                        </button>
                    </form>
                </div>
                )}
        </Formik>
    )
}

export default Register;