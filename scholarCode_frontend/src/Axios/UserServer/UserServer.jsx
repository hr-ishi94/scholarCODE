import { axiosInstance } from "../Utils/AxiosInstances";

export const UserRegister = async({username,email,password,is_active})=>{
    const newUser = {
        username,
        email,
        password,
        is_active
    }
    try{
        const response = await axiosInstance.post('/users/',newUser)
        return response.data
    }
    catch(error){
        if(error){
            console.log("error:assa ",error)
            return error.response.data
        }else{
            return error
        }
    }

}