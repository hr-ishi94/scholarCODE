import axios from 'axios'
import { main,course, socket} from '../Urls/EndPoints'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'  



// axios instance-baseURL
export const axiosInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-Type':'application/json'
    }

})


axiosInstance.interceptors.request.use(
    async function (config){
        const accessToken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')
        if (accessToken){
            const user = jwtDecode(accessToken)
            config.headers.Authorization = `Bearer ${accessToken}`
            const isExp = dayjs.unix(user.exp).diff(dayjs())<1
            if(isExp){
                const res = await axios.post(`${main}api/token/refresh/`,{refresh:refreshToken})
                if (res.status === 200 || res.status === 201){
                    config.headers.Authorization = `Bearer ${res.data.access}`
                }else{
                    console.log(res)
                }
            }
        }else{
            console.log("error in store")
        }
        return config
        
        
    },function(error){
        return Promise.reject(error)
    }
)


// axios instance for form submission
export const axiosFormInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-type': 'multipart/form-data',
    }

})

// mentor side 
export const axiosCourseInstance = axios.create({
    baseURL:course,
    headers:{
        'content-Type':'application/json'
    }
})

// mentor side form
export const axiosCourseFormInstance = axios.create({
    baseURL:course,
    headers:{
        'content-Type':'application/json'
    }
})


export const axiosChatInstance = axios.create({
    baseURL:socket,
    headers:{
        'content-Type' : 'application/json'
    }

})