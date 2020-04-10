import React from 'react';
import { Formik } from 'formik';
import validate from './validate';
import Input from '../Input';
import { signIn } from '../../utils/fetch';

function Login (props) {
    const initialValues = { email: '', password: '' };
    const onSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values;
        const { setAlertData, onLogin } =props;
        const loginResult = await signIn(email, password);
        if (loginResult.status !== 200) {
            const message = await loginResult.json();
            setAlertData("alert-danger", message);
        }else{
            const user = await loginResult.json();
            onLogin(user);
        }
        setSubmitting(false);
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
                    <form onSubmit={handleSubmit} >
                        <h3>Vehicles</h3>

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
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                        />
                        <button type="submit" disabled={isSubmitting}>
                            <div>Ingresar</div>
                        </button>
                    </form>
                </div>
                )}
        </Formik>
    )
}

export default Login;