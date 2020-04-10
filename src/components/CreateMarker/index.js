import React, {useState} from 'react';
import _ from 'lodash';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import CreateForm from '../CreateForm';

function CreateMarker (props) {
    const [location, setLocation] = useState(props.initPosition);
    const [error, setError] = useState("")
    return (
        <Marker position={props.initPosition} 
            draggable={true}
            ondragend={(e) => { 
                const {lat, lng} = e.target._latlng;
                setLocation([lat, lng]) 
            }}
            icon={L.icon({
                iconUrl: 'https://img.icons8.com/officel/2x/car.png',
                iconSize: [38, 40], 
            })}
            >
            <Popup>
                <CreateForm 
                    location={location} 
                    initialLocation={props.initPosition}
                    onVehicleCreated={props.onVehicleCreated} 
                    setAlertData={setError}
                />
                { !_.isEmpty(error) && <div className="alert alert-danger" role="alert">
                    {JSON.stringify(error)}
                </div>}
            </Popup>
        </Marker>
    )
}

export default CreateMarker;