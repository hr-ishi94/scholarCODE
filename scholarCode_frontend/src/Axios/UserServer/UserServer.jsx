import { useSelector } from "react-redux";
import { Notification_url, SOCKET } from "../Urls/EndPoints";
import { axiosChatInstance, axiosCourseInstance, axiosInstance } from "../Utils/AxiosInstances";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
export const EnrolledAllCourses = async (id) =>{
    try{
        const res = await axiosCourseInstance.get('/enrolls/')
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        console.log("error",error)
    }
}

export const EnrolledCoursesList = async (id)=>{
    try{

        const res = await axiosCourseInstance.get(`/enroll/${id}/`)
        if(res.status === 200){
            return res.data
        }

    }catch(error){

        console.log("error:",error)
        
    }
}


export const EnrollCourse = async(id,FormData) =>{
    console.log(FormData,'keid')
    try{
        const res = await axiosCourseInstance.post(`/enroll/${id}/`,FormData)
        if(res.status === 200){
            return res.data
        }
    }catch(error){
        if(error.response){
            console.log('user server error:',error.response.data)
            return error.response
        }
    }
}

export const EnrollPut = async (userid,enrollForm) =>{
    console.log(enrollForm)
    try{
        const res = await axiosCourseInstance.put(`/enroll/${userid}/`,enrollForm)
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        if(error.response){
            console.log('user server error: ',error.message.data)
            return error.response
        }
    }
}
export const EnrollPatch = async (userid,enrollForm) =>{
    console.log(enrollForm)
    try{
        const res = await axiosCourseInstance.patch(`/enroll/${userid}/`,enrollForm)
        return res.data
    }catch(error){
        if(error.response){
            console.log('user server error: ',error)
            return error.response
        }
    }
}

export const getChat = async (id)=>{
    const user_id1 = id.user_id1
    const user_id2 = id.user_id2
    console.log(user_id1,user_id2,'users chat get')
    try{
        const res = await axiosChatInstance.get(`/user/${user_id1}/${user_id2}/`)
        return res.data
    }
    catch(error){
        throw error
    }
}

export const addChatRoom = async (ids)=>{
    try{
        const res = await axiosChatInstance.post(`/add_chat_rooms/`,ids)
        return res.data
    }catch(error){
        throw error
    }
}


export const fetchNotifications = async () =>{
    try{
        const response = await axios.get(Notification_url,{
            headers:{
                Authorization :`Bearer ${localStorage.getItem('access')}`
            }
        })
        return response.data
    }catch(error){
        console.log('Error fetching notifications :',error)
        throw error

    }
}

export const markNotifications = async ()=>{
    try{
        const response = await axios.put(Notification_url,{},{
            headers:{
                Authorization :`Bearer ${localStorage.getItem('access')}`
            }
    });
        return response
    }
    catch(error){
        console.log('Error while marking read',error)
    }
}

export const userFeedbacks= async ()=>{
    try{
        const response = await axiosCourseInstance.get('user_feedbacks')
        if (response.status === 200){
            return response.data
        } 
    }catch(error){
        console.log('Error in fetching user_feedaback',error)
    }
}

export const userFeedbackPost= async (formData)=>{
    try{
        console.log(formData,'kkkl')
        const response = await axiosCourseInstance.post('user_feedbacks/',formData)
        console.log(response,'lojjj')
        if (response.status === 200){
            
            return response.data
        } 
    }catch(error){
        console.log('Error in fetching user_feedaback',error)
    }
}

