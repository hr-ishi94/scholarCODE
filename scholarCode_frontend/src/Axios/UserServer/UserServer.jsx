import { axiosCourseInstance, axiosInstance } from "../Utils/AxiosInstances";

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

export const EnrolledCoursesList = async ()=>{
    try{

        const res = await axiosCourseInstance.get(`/enroll/`)
        if(res.status === 200){
            return res.data
        }

    }catch(error){

        console.log("error:",error)
        
    }
}

export const EnrollCourse = async(FormData) =>{
    console.log(FormData,'keid')
    try{
        const res = await axiosCourseInstance.post(`/enroll/`,FormData)
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
export const EnrollPut = async (enrollForm) =>{
    console.log(enrollForm)
    try{
        const res = await axiosCourseInstance.put('/enroll/',enrollForm)
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

export const getChat = async (id)=>{
    const user_id1 = id.user_id1
    const user_id2 = id.user_id2
    console.log(user_id1,user_id2,'users chat get')
    try{
        const res = await axiosInstance.get(`/chat/user/${user_id1}/${user_id2}/`)
    }
    catch(error){
        throw error
    }
}