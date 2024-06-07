import { axiosInstance, axiosCourseInstance, axiosCourseFormInstance } from "../Utils/AxiosInstances"

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

export const MentorCourseList = async()=>{
    const res = await axiosCourseInstance.get(`mentor/`)
    if (res.status === 200){
        return res.data
    }
    
}

export const MentorCourseAssign = async (newCourse)=>{
    try{
        
        const res = await axiosCourseFormInstance.post(`/mentor/${newCourse.mentor}/`,newCourse)
        if (res.status === 200){
            return res
        }
        else{
            console.log(res)
        }
    }
    catch(error){
        if(error.response.data){
            console.log('sdfoi',error)
            return error.response
        }else{
            return error
        }

    }
}

export const mentorCourseDelete = async (id)=>{
    try{
        const res = await axiosCourseInstance.delete(`/mentor/delete/${id}`)
        if (res.status === 204){
            return true
        }else{
            throw new Error("Failed to delete the course")
        }
    }catch(error){
        console.log("failed to delete",error)
    }
}