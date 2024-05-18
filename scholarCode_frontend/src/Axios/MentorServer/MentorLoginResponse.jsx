import axios from 'axios'
import { main } from '../Urls/EndPoints'


export const MentorResponse = async (email,password)=>{
    try{
        
        const response = await axios.post(`${main}mentor/login/`,{email,password})
        console.log(response,"subothi")
        if (response.status === 200 || response.status === 201){
            const access = response.data.access_token
            const refresh = response.data.refresh_token
            const authdata = {access,refresh,'is_authenticated':true,"is_superuser":false,'type':'mentor'}
            return authdata
        }
    }catch(error){
        error = {'error':'Authentication Failed'}
        return error
    }
    
}