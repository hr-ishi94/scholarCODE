import { axiosInstance } from "../Utils/AxiosInstances";

export const usersListInstance = async()=>{
    const res = await axiosInstance.get('users/')
    if (res.status === 200){

        return res.data;
    }
}

export const userDetailsInstance = async(id) =>{
    const res = await axiosInstance.get(`user/${id}/`)
    if(res.status === 200 ){
        return res.data
    }
}
export const userstatusInstance = async(id,updateData) =>{
    try{
        console.log(id,"idss")
        const res = await axiosInstance.put(`user/${id}/`,updateData)
        console.log('updated res',res)
        if(res.status === 200 ){
            return res.data
        }else{
            throw new Error("failed to update user status")
        }
    }catch(error){
        console.log("Error updating user status:",error.response)
        throw error
    }

}

export const MentorsListInstance = async ()=>{
    const res = await axiosInstance.get('mentors/')
    if (res.status === 200){

        return res.data;
    }
}

export const mentorDetails= async (id)=>{
    const res = await axiosInstance.get(`mentor/${id}/`)
    if (res.status === 200){
        
        return res.data;

    }

} 

export const mentorStatusInstance = async (id,updateMentor)=>{
    try{

        const res = await axiosInstance.put(`mentor/${id}/`,updateMentor)
        if (res.status ===200){
            return res.data
        }else{
            console.log("error updating mentor")
        }
       
    }catch(error){
        console.log(error.response,"axios instance error")
        throw error
        
    }

}

export const mentorDeleteInstance = async (id)=>{
    try{
        const res = await axiosInstance.delete(`mentor/${id}`)
        if (res.status === 204){
            return true
        }else{
            throw new Error("Failed to delete mentor")
        }
    }catch(error){
        console.log('Error in deleting',error)
        throw error
    }
}

export const coursesListInstance = async(id)=>{
    const res = await axiosInstance.get('courses/')
    if (res.status === 200){
        return res.data
    }
}

export const courseDetails= async (id)=>{
    const res = await axiosInstance.get(`course/${id}/`)
    if (res.status === 200){
        
        return res.data;

    }
}   

export const categoryListInstance = async(id)=>{
    const res = await axiosInstance.get('categories/')
    if (res.status === 200){
        return res.data
    }
}

export const categoryAddInstance = async(newCategory)=>{
    const res = await axiosInstance.post('categories/',newCategory)
    if (res.status === 200){
        return res.data
    }
}

export const categoryDetails= async (id)=>{
    const res = await axiosInstance.get(`category/${id}/`)
    if (res.status === 200){
        
        return res.data;

    }
}   


export const tasksListInstance = async(courseId)=>{
    const res = await axiosInstance.get(`tasks/${courseId}/`)
    if (res.status === 200){
        return res.data
    }
}

export const tasksEditInstance= async (id)=>{
    const res = await axiosInstance.get(`task/edit/${id}/`)
    if (res.status === 200){
        
        return res.data;

    }
}   