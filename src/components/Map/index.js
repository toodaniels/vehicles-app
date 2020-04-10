import React, { useState } from 'react'
import _ from 'lodash';
import Control from 'react-leaflet-control';
import { Map, TileLayer } from 'react-leaflet';

import CreateMarker from '../CreateMarker';
import UpdateMarker from '../UpdateMarker';

const position = [19.432608, -99.133209]
const LeafletMap = (props) => {
  const { vehicles, updateVehicles } = props;
  const [creatingVehicle, setCreatingVehicle] = useState(false);
  const [message, setMessage] = useState("");


  const onVehicleCreated = (status) =>{
    setCreatingVehicle(false);
    updateVehicles();
    if (status) {
      setMessage("Creado Correctamente")
    }
  } 

  const onVehicleUpdated = (status) =>{
    updateVehicles();
    if (status) {
      setMessage("Actualizado Correctamente")
    }
  } 

  const onVehicleDeleted = (status) =>{
    updateVehicles();
    if (status) {
      setMessage("Eliminado Correctamente")
    }
  } 

  return (
    <div className="map">
        <Map center={position} zoom={13}>
            <TileLayer
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            
            {creatingVehicle &&  
              <CreateMarker 
                initPosition={position} 
                onVehicleCreated={onVehicleCreated}
              />
            } 

            {
              vehicles.map((vehicle) =>(
                <UpdateMarker 
                  key={vehicle._id}
                  vehicle={vehicle} 
                  onVehicleUpdated={onVehicleUpdated}
                  onVehicleDeleted={onVehicleDeleted}
                />
              ))
            }
                

            <Control position="topright" >
              <div className="float-button-group" onClick={()=> setCreatingVehicle(true)}>
                <div className="float-button">
                  <i className="fas fa-car"></i> <i className="fas fa-plus-circle float-second-icon"></i> 
                </div>
              </div>
            </Control>

            <Control position="bottomright" >
              { !_.isEmpty(message) &&
                <div className="alert alert-success" role="alert">
                  {message} <i className="fas fa-times" onClick={() => {setMessage("")}}></i>
                </div>
              }
            </Control>

        </Map>
    </div>
  )
}

export default LeafletMap;