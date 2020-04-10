import React, {useContext} from 'react';
import _ from 'lodash';
import { Formik } from 'formik';
import Input from '../Input';
import validate from './validate';
import { updateVehicle, deleteVehicle } from '../../utils/fetch';
import { userContext } from '../../context';


function UpdateForm (props) {
    const context = useContext(userContext);
    const initialValues = { plate: props.plate };
    const onSubmit = async (values, { setSubmitting }) => {
        const { plate } = values;
        const { location, onVehicleUpdated, setAlertData } = props;
        const createVechicleResult = await updateVehicle( props.plate, plate, location, context.user.token);
        if (createVechicleResult.status !== 204) {
            setAlertData("Ya existe esa placa");
            return ;
        }
        setAlertData("");
        setSubmitting(false);
        onVehicleUpdated(true);
    };

    const onDelete = async () => {
        const { onVehicleDeleted, setAlertData, plate } = props;
        const createVechicleResult = await deleteVehicle( plate, context.user.token);
        if (createVechicleResult.status !== 204) {
            setAlertData("Ocurrió un error");
            return ;
        }
        setAlertData("");
        onVehicleDeleted(true);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={ validate }
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
                        <h5>Actualizar vehiculo</h5>
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
                            Locación  Actual: {
                                JSON.stringify(props.location)
                            }
                        <div>
                        </div>
                            Locación  Inicial: {
                                JSON.stringify(props.initialLocation)
                            }
                        </div>
                        <button 
                            type="submit" 
                            className="popup-button" 
                            disabled={
                                isSubmitting || 
                                (_.isEqual(props.location, props.initialLocation) &&
                                _.isEqual(values.plate, props.plate))
                            }
                        >
                            <i className="fas fa-save"></i> 
                        </button>
                        <div className="float-button popup-button" onClick={onDelete}>
                            <i className="fas fa-trash float-second-icon"></i> 
                        </div>
                    </form>
                )}
        </Formik>
    )
}

export default UpdateForm;
