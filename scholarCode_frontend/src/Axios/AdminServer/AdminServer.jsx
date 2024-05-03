import { axiosInstance } from "../Utils/AxiosInstances";

export const usersListInstance = async()=>{
    const res = await axiosInstance.get('users/')
    if (res.status === 200){

        return res.data;
    }
}

export const MentorsListInstance = async ()=>{
    const res = await axiosInstance.get('mentors/')
    if (res.status === 200){

        return res.data;
    }
}

export const mentorDetails= async (id)=>{
    // const {mentor_id} = id
    const res = await axiosInstance.get(`mentor/${id}`)
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