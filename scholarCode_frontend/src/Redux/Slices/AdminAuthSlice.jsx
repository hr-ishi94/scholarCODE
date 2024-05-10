import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { AdminResponse } from "../../Axios/AdminServer/AdminLoginResponse";


export const LoginAdmin = createAsyncThunk('admin/login',async({email,password})=>{
    const authdata = await AdminResponse(email,password);
    
    return authdata
}) 


const AdminauthSlice = createSlice({
    name:'auth',
    initialState:initialstate.AdminToken,
    reducers:{
        AdminLogout:(state)=>{
            return initialstate.AdminToken
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAdmin.fulfilled,(state,action)=>{
                    state.access = action.payload.access,
                    state.refresh = action.payload.refresh,
                    state.type = 'user',
                    state.is_authenticated = true,
                    state.is_superuser = true,
                    state.registerSuccess = null   
            
        })
    }
})

export const {AdminLogout} = AdminauthSlice.actions
export default AdminauthSlice.reducer