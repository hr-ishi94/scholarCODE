import { axiosInstance } from "../Utils/AxiosInstances"

export const MentorRegister = async({first_name,last_name, email, username, designation, linkedin_profile, password,is_staff})=>{
    const newMentor = {
        first_name,
        last_name,
        email, 
        username, 
        designation, 
        linkedin_profile, 
        password,
        is_staff,
        
    }
    try{
        const response = await axiosInstance.post('/mentors/',newMentor)
        console.log(response)
        return response.data
    }
    catch(error){
        if (error.response.data){
            return error.response
        }else{
            return error
        }
    }
}