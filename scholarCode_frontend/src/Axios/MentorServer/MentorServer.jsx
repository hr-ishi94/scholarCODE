import { resetState } from "../../Redux/Slices/CoursesListSlice"
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
        
        const res = await axiosCourseFormInstance.post(`/mentor/`,newCourse)
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

export const ReviewMarkList = async()=>{
    try{
        const res = await axiosCourseInstance.get('/review_marks/')
        if (res.status === 200){
            return res.data
            
        }
    }catch(error){
        console.log(error,'error')
    }
}

export const ReviewMarkPost = async(formData)=>{
    try{

        const res = await axiosCourseInstance.post('/review_marks/',formData)
        if (res.status === 200  || res.status === 201){

            return res.data
        }
        
    }
    catch(error){
        if (error.response.data){
            return error.response
        }else{
            return error
        }
    }
    
}

export const MentorReviewTimings = async (mentor_id)=>{
    try{
        const res = await axiosCourseInstance.get(`mentor_timings/${mentor_id}/`)
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        console.log('Error while fetching timings of mentor',error)
    }

}
export const MentorPostReviewTimings = async (mentor_id,formData)=>{
    try{
        const res = await axiosCourseInstance.post(`mentor_timings/${mentor_id}/`,formData)
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        console.log('Error while fetching timings of mentor',error)
    }

}
export const MentorPatchReviewTimings = async (mentor_id,formData)=>{
    try{
        const res = await axiosCourseInstance.patch(`mentor_timings/${mentor_id}/`,formData)
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        console.log('Error while fetching timings of mentor',error)
    }

}


export const MentorWallet = async (mentor_id) =>{
    try{
        const res = await axiosCourseInstance.get(`mentor_wallet/${mentor_id}/`)
        if (res.status === 200){
            return res.data
        }
    }catch (error){
        console.log("Error while fetching mentor's wallet",error)
    }
}

export const MentorWalletPatch = async (mentor_id,formData) =>{
    try{
        const res = await axiosCourseInstance.patch(`mentor_wallet/${mentor_id}/`,formData)
        if (res.status === 200){
            return res.data
        }
    }catch (error){
        console.log("Error while fetching mentor's wallet",error)
    }
}


export const MentorTransactions = async (wallet_id)=>{
    try{
        const res = await axiosCourseInstance.get(`mentor_txns/${wallet_id}/`)
        if (res.status === 200){
            return res.data
        }
    }catch(error){
        console.log("Error while fetching mentor's txns",error)
    }
}



