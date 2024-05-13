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
        if(error){
            console.log("error: ",error)
            return error.response.data
        }else{
            return error
        }
    }

}