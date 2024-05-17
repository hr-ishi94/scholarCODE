import axios from 'axios'
import { main } from '../Urls/EndPoints'
// import {store} from '../../Redux/Store/Store.jsx'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'



// axios instance-baseURL
export const axiosInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-Type':'application/json'
    }

})

// axiosInstance.interceptors.request.use(
//     async function (config){
//         const state = store.getState()
//         const accessToken = state.AdminToken.access
//         const refreshToken = state.AdminToken.refresh
//         if (accessToken){
//             config.headers.Authorization = `Bearer ${accessToken}`
//             const user = jwtDecode(accessToken)
//             const isExp = dayjs.unix(user.exp).diff(dayjs())<1
//             if(isExp){
//                 const res = await axios.post(`${main}api/token/refresh/`,{refresh:refreshToken})
//                 if (res.status === 200 || res.status === 201){
//                     config.headers.Authorization = `Bearer ${res.data.access}`
//                 }else{
//                     console.log(res)
//                 }
//             }
//         }else{
//             console.log("error in store")
//         }
//         return config
        
        
//     },function(error){
//         return Promise.reject(error)
//     }
// )


// axios instance for form submission
export const axiosFormInstance = axios.create({
    
    baseURL: main,
    headers: {
        'content-type': 'multipart/form-data',
    }

})