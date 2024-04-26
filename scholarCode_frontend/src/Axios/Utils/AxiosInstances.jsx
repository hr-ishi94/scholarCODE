import axios from 'axios'
import { main } from '../Urls/EndPoints'

export const axiosInstance = axios.create({
    baseURL: main,
    headers: {
        'Content-Type':'application/json'
    }

})