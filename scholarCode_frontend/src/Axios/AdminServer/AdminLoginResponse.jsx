

import axios from "axios";
import { main } from "../Urls/EndPoints";

export const AdminResponse = async (email,password)=>{
    try {
        const response = await axios.post(`${main}admin/login/`, {
            email,
            password,
        });
        if(response.status ===200 || response.status === 201){

            const access = response.data.access_token;
            const refresh = response.data.refresh_token;
            const authdata = { 'access': access, 'refresh': refresh,'type':'admin','is_authenticated':true,'is_superuser':true};
            return authdata;
        }
    } catch (error) {
        error = { 'error': 'Authentication Failed'};
        return error;
    }
}