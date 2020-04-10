import { signup, signin, vehicles } from '../constants';
import _ from 'lodash';
const API = process.env.REACT_APP_API;

const request = async ( endpoint ,method, body = {}, auth) =>{
    var headers = {};
    try {
        let options = {
            method
        }

        if (['POST', 'PUT'].includes(method)){
            headers['Content-Type'] = 'application/json';
            options = {...options, body : JSON.stringify(body)};
        }
        
        if (!_.isEmpty(auth)){
            headers['Authorization'] = `Bearer ${auth}`;
        }


        options = {...options, headers};

        const requestResult = await fetch( API + endpoint, options);
        
        return requestResult;

    }catch (e) {
        return e;
    }
};

export const signUp = async (email, name, password) =>{
    return await request(signup, 'POST', { email, name, password });
};

export const signIn = async (email, password) =>{
    return await request(signin, 'POST', { email, password });
};

export const createVehicle = async (plate, location, token) =>{
    return await request(vehicles, 'POST', { plate, location }, token);
};

export const getVehicles = async (token) =>{
    return await request(vehicles, 'GET', null, token);
};

export const updateVehicle = async ( originalPlate ,plate, location, token) =>{
    return await request(vehicles + `/${originalPlate}`, 'PUT', { plate, location }, token);
};

export const deleteVehicle = async (plate, token) =>{
    return await request(vehicles + `/${plate}` , 'DELETE', null, token);
};