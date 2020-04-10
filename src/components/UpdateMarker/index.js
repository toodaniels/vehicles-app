import React, {useState} from 'react';
import _ from 'lodash';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import UpdateForm from '../UpdateForm';

function UpdateMaker (props) {
    const {vehicle} = props;
    const [location, setLocation] = useState(vehicle.location.coordinates);
    const [error, setError] = useState("")

    return (
        <Marker position={vehicle.location.coordinates} 
            draggable={true}
            ondragend={(e) => { 
                const {lat, lng} = e.target._latlng;
                setLocation([lat, lng]) 
            }}
            icon={L.icon({
                iconUrl: 'https://img.icons8.com/plasticine/2x/car.png',
                iconSize: [38, 40], 
            })}
            >
            <Popup>
                <UpdateForm 
                    location={location} 
                    initialLocation={vehicle.location.coordinates}
                    plate={vehicle.plate}
                    onVehicleUpdated={props.onVehicleUpdated} 
                    onVehicleDeleted={props.onVehicleDeleted}
                    setAlertData={setError}
                />
                { !_.isEmpty(error) && <div className="alert alert-danger" role="alert">
                    {JSON.stringify(error)}
                </div>}
            </Popup>
        </Marker>
    )
}

export default UpdateMaker;