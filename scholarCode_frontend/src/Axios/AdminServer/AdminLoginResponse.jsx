// import axios from 'axios'
// import { main } from '../Urls/EndPoints'

// export const AdminResponse = async (email,password)=>{
//     try {
    
//         const response = await axios.post(`${main}admin/login/`, {
//             email,
//             password,
//         });
//         console.log(response)
//         const access = response.data.access_token;
//         const refresh = response.data.refresh_token;
//         // const user = response.data
//         console.log('User data:', user);
//         const authdata = { 'access': access, 'refresh': refresh};
//         return authdata;
//     } catch (error) {
//         error = { 'error': 'Authentication Failed' };
//         return error;
//     }
// }

import axios from "axios";
import { main } from "../Urls/EndPoints";

export const AdminResponse =async (email,password)=>{
    try {
        const response = await axios.post(`${main}admin/login/`, {
            email,
            password,
        });
        const access = response.data.access_token;
        const refresh = response.data.refresh_token;
        // const user = response.data.role
        // console.log('User data:', response.data);
        const authdata = { 'access': access, 'refresh': refresh};
        return authdata;
    } catch (error) {
        console.log(error.response.data)
        error = { 'error': 'Authentication Failed'};
        return error;
    }
}