import { axiosInstance } from "../Utils/AxiosInstances";

export const usersListInstance = async()=>{
    const res = await axiosInstance.get('users/')
    if (res.status === 200){

        return res.data;
    }
}

export const userDetailsInstance = async(id) =>{
    const res = await axiosInstance.get(`user/${id}`)
    if(res.status === 200 ){
        return res.data
    }
}

export const MentorsListInstance = async ()=>{
    const res = await axiosInstance.get('mentors/')
    if (res.status === 200){

        return res.data;
    }
}

export const mentorDetails= async (id)=>{
    const res = await axiosInstance.get(`mentor/${id}`)
    if (res.status === 200){
        
        return res.data;

    }
}   

export const coursesListInstance = async(id)=>{
    const res = await axiosInstance.get('courses/')
    if (res.status === 200){
        return res.data
    }
}

export const courseDetails= async (id)=>{
    const res = await axiosInstance.get(`course/${id}`)
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

export const categoryDetails= async (id)=>{
    const res = await axiosInstance.get(`category/${id}`)
    if (res.status === 200){
        
        return res.data;

    }
}   


export const tasksListInstance = async(courseId)=>{
    const res = await axiosInstance.get(`tasks/${courseId}`)
    if (res.status === 200){
        return res.data
    }
}

export const tasksEditInstance= async (id)=>{
    const res = await axiosInstance.get(`task/edit/${id}`)
    if (res.status === 200){
        
        return res.data;

    }
}   