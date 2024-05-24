import axios from 'axios'
import { main } from '../Urls/EndPoints'


export const UserResponse  = async(email,password)=>{
    try {
        const res = await axios.post(`${main}user/login/`,{email,password})
        if (res.status === 200 || Response.status === 201){
            const access = res.data.access_token
            const refresh = res.data.refresh_token
            const authdata = {
                access,
                refresh,
                'is_authenticated':true,
                'is_superuser':false,
                'type':'user'
                }
            return authdata
        }

    }catch(error){
        console.log(error.Response,"erooroii")
        error = {'error':'Authentication Failed'}
        return error
    }
}