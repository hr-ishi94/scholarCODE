import { axiosCourseInstance, axiosFormInstance, axiosInstance } from "../Utils/AxiosInstances";

export const userDetailsInstance = async(id) =>{
    const res = await axiosInstance.get(`user/${id}/`)
    if(res.status === 200 ){
        return res.data
    }
}

export const usersListInstance = async()=>{
    const res = await axiosInstance.get('users/')
    if (res.status === 200){

        return res.data;
    }
}
export const userstatusInstance = async(id,updateData) =>{
    try{
        console.log(id,"idss")
        const res = await axiosFormInstance.put(`user/${id}/`,updateData)
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

        const res = await axiosFormInstance.put(`mentor/${id}/`,updateMentor)
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

export const mentorApprovalInstance = async(id,updateMentor)=>{
    try{
        const res = await axiosInstance.put(`admin/mentor/${id}`,updateMentor)
        if (res.status === 200 || res.status ===201){
            return res.data
        }else{
            console.log("error while approving mentor")
        }
    }catch(error){
        console.log(error.message,"axios Instance error")
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
export const coursesAddInstance = async(newCourse)=>{
    try{

        const res = await axiosFormInstance.post('courses/',newCourse)
        if (res.status === 200 || res.status ==201){
            return res.data
        }
    }catch(error){
        if (error.response){
            console.log('error:',error.response.data)
            return error
        }
    }
}

export const courseDetails= async (id)=>{
    try{
        
        const res = await axiosInstance.get(`course/${id}/`)
        if (res.status === 200){
            
            return res.data;
    
        }
    }catch(error){
        console.log("error occured ",error)
        return error
    }
}

export const courseUpdateInstance  = async (id,courseData) =>{
    try{
        const res = await axiosFormInstance.put(`/course/${id}/`,courseData)
        if (res.status == 200 || res.status == 201){
            return res.data
        }
    }catch(error){
        console.log("Error occured while updating data",error)
        return error
    }
}

export const categoryListInstance = async(id)=>{
    const res = await axiosInstance.get('categories/')
    if (res.status === 200){
        return res.data
    }
}

export const categoryAddInstance = async(newCategory)=>{
    try{
        const res = await axiosInstance.post('categories/',newCategory)

        if (res.status === 200 || res.status === 201){
            return res.data
        }
    }catch(error){
        if(error.response.data){
            return error.response.data
        }
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
export const addTaskInstance = async(courseId,taskData)=>{

    const res = await axiosInstance.post(`tasks/${courseId}/`,taskData)
    if (res.status === 200 || res.status ==201){
        return res.data
    }
}

export const adminTransactions = async () =>{
    const res = await axiosCourseInstance.get('transactions/')
    if (res.status === 200){
        return res.data
    }
}

export const adminTransactionPost = async (formdata) =>{
    try{

        const res = await axiosCourseInstance.post('transactions/',formdata) 
        return res
    }
    catch(error){
        console.log(error)
    }
}

export const updateTaskInstance = async(taskId,taskData)=>{
    try{

        const res = await axiosInstance.put(`/task/edit/${taskId}/`,taskData)
        if (res.status==200|| res.status==201){
            return res.data    
        }
    }catch(error){
        throw error
    }
}

export const tasksEditInstance= async (id)=>{
    const res = await axiosInstance.get(`task/edit/${id}/`)
    if (res.status === 200){
        
        return res.data;

    }
}   

export const taskDeleteInstance = async (id)=>{
    try{
        const res = await axiosInstance.delete(`task/edit/${id}`)
        if (res.status === 204){
            return true
        }else{
            throw new Error("Failed to delete mentor")
        }
        
    }catch(error){
        console.log("Failed to delete task-instance",error)
    }

}

export const payment_ids = async () =>{
    try{
        const res = await axiosCourseInstance.get('razorpay_tran_ids/')
        if (res.status === 200  || res.status === 201){

            return res
        }
    }
    catch(error){
        console.log(error)
    }
} 