import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { UserResponse } from "../../Axios/UserServer/UserLoginResponse";

export const UserLogin = createAsyncThunk('user/login',async ({email,password})=>{
    console.log(email,"emails")
    const authdata = await UserResponse(email,password)
    return authdata
})

const UserauthSlice = createSlice({
    name:'auth-user',
    initialState:initialstate.UserToken,
    reducers:{
        userLogout:(state)=>{
            state.access = null,
            state.refresh = null,
            state.is_authenticated =false,
            state.is_superuser= false,
            state.type = null,
            state.registerSuccess= null
        }

    },
    extraReducers:(builders)=>{
        builders
        .addCase(UserLogin.fulfilled,(state,action)=>{
            state.access=action.payload.access,
            state.refresh=action.payload.refresh,
            state.type=action.payload.type,
            state.is_authenticated=action.payload.is_authenticated,
            state.is_superuser=action.payload.is_superuser,
            state.registerSuccess = null
        })
    }
})


export const {userLogout} = UserauthSlice.actions
export default UserauthSlice.reducer