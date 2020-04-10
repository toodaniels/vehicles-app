import React, {useContext} from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import Input from '../Input';
import validate from './validate';
import { createVehicle } from '../../utils/fetch';
import { userContext } from '../../context';


function CreateForm (props) {
    const context = useContext(userContext);
    const initialValues = { plate: '' };
    const onSubmit = async (values, { setSubmitting }) => {
        const { plate } = values;
        const { location, onVehicleCreated, setAlertData } = props;
        const createVechicleResult = await createVehicle(plate, location, context.user.token);
        if (createVechicleResult.status !== 201) {
            setAlertData("Ya existe esa placa");
            return ;
        }
        setAlertData("");
        setSubmitting(false);
        onVehicleCreated(true);
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
                    <form onSubmit={handleSubmit}>
                        <h5>Creando nuevo vehiculo</h5>
                        <Input
                            type="text"
                            name="plate"
                            placeholder="Placa"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.plate}
                            error={errors.plate}
                            touched={touched.plate}
                        />
                        <div>
                            Location : {
                                JSON.stringify(props.location)
                            }
                        </div>
                        <button 
                            type="submit" 
                            className="popup-button" 
                            disabled={isSubmitting || _.isEmpty(values.plate) || _.isEmpty(props.location) }>
                            <i className="fas fa-save"></i> 
                        </button>
                        <div className="float-button popup-button" onClick={() => {props.onVehicleCreated(false)}}>
                            <i className="fas fa-times float-second-icon"></i> 
                        </div>
                    </form>
                )}
        </Formik>
    )
}

export default CreateForm;
