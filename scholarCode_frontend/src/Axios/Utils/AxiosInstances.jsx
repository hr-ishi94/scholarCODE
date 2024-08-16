import axios from 'axios'
import { main,course, CHAT} from '../Urls/EndPoints'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'  

const refreshToken = async ()=>{
    const refreshToken = localStorage.getItem('refresh')
    try{
        const response = await axios.post(`${main}api/token/refresh/`,
            {refresh:refreshToken})
        if (response.status === 200 || response.status === 201){
            localStorage.setItem('access',response.data.access)
            return response.data.access
        }
    }
    catch(error){
        console.log('Failed to refresh token',error)
    }
    return null
}


const addAuthInterceptor = (axiosInstance) =>{
    axiosInstance.interceptors.request.use(
        async (config) =>{
            const accessToken = localStorage.getItem('access')
            if (accessToken){
                const user = jwtDecode(accessToken)
                const isExp = dayjs.unix(user.exp).diff(dayjs())<1
                if (isExp){
                    const newAccessToken = await refreshToken()
                    if (newAccessToken){
                        config.headers.Authorization = ` Bearer ${newAccessToken}`
                    }
                }else{
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
            }
            return config
        },
        (error)=>{
            return Promise.reject(error)
        }
    )
}




// axios instance-baseURL
export const axiosInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-Type':'application/json'
    }

})
addAuthInterceptor(axiosInstance)


// axios instance for form submission
export const axiosFormInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-type': 'multipart/form-data',
    }

})
addAuthInterceptor(axiosFormInstance)



// mentor side 
export const axiosCourseInstance = axios.create({
    baseURL:course,
    headers:{
        'content-Type':'application/json'
    }
})
addAuthInterceptor(axiosCourseInstance)


// mentor side form
export const axiosCourseFormInstance = axios.create({
    baseURL:course,
    headers:{
        'content-Type':'multipart/form-data'
    }
})
addAuthInterceptor(axiosCourseFormInstance)



export const axiosChatInstance = axios.create({
    baseURL:CHAT,
    headers:{
        'content-Type' : 'application/json'
    }

})
addAuthInterceptor(axiosChatInstance)