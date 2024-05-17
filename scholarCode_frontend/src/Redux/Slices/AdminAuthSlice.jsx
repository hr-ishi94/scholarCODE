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
            AdminLogout: (state) => {
                state.access = null;
                state.refresh = null;
                state.type = null;
                state.is_authenticated = false;
                state.is_superuser = false;
                state.registerSuccess = null;
            }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAdmin.fulfilled,(state,action)=>{
                    state.access = action.payload.access  ,
                    state.refresh = action.payload.refresh ,
                    state.type = action.payload.type,
                    state.is_authenticated = action.payload.is_authenticated,
                    state.is_superuser = action.payload.is_superuser,
                    state.registerSuccess = null   
            
        })
        .addCase(LoginAdmin.rejected,(state)=>{
            state.AdminToken = initialstate.AdminToken

        })
    }
})

export const {AdminLogout} = AdminauthSlice.actions
export default AdminauthSlice.reducer