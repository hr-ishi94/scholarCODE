import axios from 'axios'
import { main } from '../Urls/EndPoints'


// axios instance-baseURL
export const axiosInstance = axios.create({
    
    baseURL: main,
    headers: {
        'Content-Type':'application/json'
    }

})