import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { UserResponse } from "../../Axios/UserServer/UserLoginResponse";

export const UserLogin = createAsyncThunk('user/login',async ({email,password})=>{
    const authdata = await UserResponse(email,password)
    return authdata
})

const UserauthSlice = createSlice({
    name:'auth-user',
    initialState:initialstate.UserToken,
    reducers:{

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



export default UserauthSlice.reducer