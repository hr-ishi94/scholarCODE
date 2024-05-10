import { axiosInstance } from "../Utils/AxiosInstances";

export const UserRegister = async({username,email,password,isactive})=>{
    const newUser = {
        username,
        email,
        password,
        isactive
    }
    try{
        const response = await axiosInstance.post('/users/',newUser)
        return response.data
    }
    catch(error){
        if(error.response.data.error){
            console.log()
            return error.response.data.error
        }else{
            return error
        }
    }

}