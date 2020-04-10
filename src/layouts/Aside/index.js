import React, { useState, useContext } from 'react';
import _ from 'lodash';
import { userContext } from '../../context';
import Register from '../../components/Register';
import Login from '../../components/Login';
import Alert from '../../components/Alert';
function Aside(props) {
    const context = useContext(userContext);

    const [register, setRegiter] = useState(false); 
    const [alertMessage,  setAlertMessage] = useState("");
    const [alertType,  setAlertType] = useState("");

    const handleToRegister = () =>{
        setRegiter(!register);
    };
    const setAlertData = (type, message) =>{
        setAlertMessage(message);
        setAlertType(type);
    }

    const onLogin = (user) => {
        context.setUser(user);
        //setHidden(true);
    }

    
    return (
        <aside>
            { _.isEmpty(context.user) ?
                <>
                    {
                        !register ? 
                        <Login gotoRegister={handleToRegister}  setAlertData={setAlertData} onLogin={onLogin}/>:
                        <Register gotoLogin={handleToRegister} setAlertData={setAlertData}/>
                    
                    }
                    <div className="link" onClick={handleToRegister} href="">
                        {
                            register ? "Regresar" : "Registarme"
                        }
                    </div>
                    <Alert type={alertType} message={alertMessage}/>  
                </>:
                <>
                    <div className="instructions">
                        <div className="float" onClick={ () =>{ props.closeAside() }}>
                            <i className="fas fa-times my-float"></i>
                        </div>
                        <h3>
                            Bienvenido!
                        </h3>
                        <h5>
                            Crea nuevos vehiculos
                        </h5>
                        <ol>
                            <li>
                                Presiona el boton: 
                                <div className="float-button popup-button"> 
                                    <i className="fas fa-car"></i> <i className="fas fa-plus-circle float-second-icon"></i> 
                                </div>
                            </li>
                            <li>
                                Arrastra el: 
                                <img className="icon" src="https://img.icons8.com/officel/2x/car.png" width={38} height={40} alt="car icon"/>
                                para asignarle su nueva localización.
                            </li>
                            <li>
                                Asigna un número de placa y presiona: 
                                <div className="float-button popup-button"> 
                                    <i className="fas fa-save"></i>
                                </div>
                                para guardar los cambios
                            </li>
                        </ol>
                        <h5>
                           Actualiza y elimina vehiculos
                        </h5>
                        <ol>
                            <li>
                                Presiona o arrastra los:
                                <img className="icon" src="https://img.icons8.com/plasticine/2x/car.png" width={38} height={40} alt="car icon"/>                                
                            </li>
                            <li>
                                Asigna un nuevo número de placa o localización y presiona: 
                                <div className="float-button popup-button"> 
                                    <i className="fas fa-save"></i>
                                </div>
                                para guardar los cambios
                            </li>
                            <li>
                                Presiona el:  
                                <div className="float-button popup-button"> 
                                    <i className="fas fa-trash"></i>
                                </div> 
                                para eliminar el vehiculo
                            </li>
                        </ol>
                        <div>
                            
                        </div>

                    </div>
                </>
            }
        </aside>
        
    )
}

export default Aside;