import axios from 'axios';
import { getFromLocalStore, saveToLocalStore, deleteFromLocalStore } from '../utils/helpers'


//Create axios instance
export const apiInstance = axios.create({
    baseURL:"https://apertum-interview.herokuapp.com"
})

const _AUTH_TOKEN_ = getFromLocalStore('authToken');

//Attach auth token if present
if(_AUTH_TOKEN_) {
    apiInstance.defaults.headers.common['Authorization'] = 'Bearer '+_AUTH_TOKEN_
}

//Set data to headers
export const setToHeaders = (key, value) => {
    if(key && value) {
        if(key == "Authorization") {
            apiInstance.defaults.headers.common[key] = 'Bearer ' + value;
        } else {
            apiInstance.defaults.headers.common[key] = value;
        }
    }
}

//Parse axios response data
export const parseResponseData = response => {
    return response.data;
}
