import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import LeafletMap from '../Map';
import { userContext } from '../../context';
import { getVehicles } from '.././../utils/fetch';

function Home (props) {
    const context = useContext(userContext);
    const [vehicles, setVehicles] = useState([]);

    const updateVehicles = async ()=>{
        const vehiclesResponse = await getVehicles(context.user.token);
        const vehiclesResult = await vehiclesResponse.json();
        setVehicles(vehiclesResult);
    }

    const onLogout = () =>{
        context.setUser({});
    }

    useEffect(() =>{
        const fetchVehicles = async ()=>{
            const vehiclesResponse = await getVehicles(context.user.token);
            const vehiclesResult = await vehiclesResponse.json();
            setVehicles(vehiclesResult);
        }
        fetchVehicles();
    }, [ context.user.token ]);

    const {showAside} = props;
    let classes = ["home"];

    if (showAside) {
        classes.push("home-margin");
    }
    
    return (
        <div className={classnames(classes)}>
            <nav className="navbar">
                <div className="navbar-brand" onClick={() =>{props.openAside()}}>
                    <div>
                        { !showAside ? <i className="far fa-question-circle"></i> :
                            <i className="fa fa-times"></i> 
                        } Vehiculos 
                    </div>
                </div>

                <div className="logout" onClick={onLogout}>
                    <i className="fas fa-car-side"></i> {context.user.email} <i className="fas fa-sign-out-alt"></i>
                </div>
            </nav>
            <LeafletMap vehicles={vehicles} updateVehicles={updateVehicles}/>
        </div>
    )
}

export default Home;