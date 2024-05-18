import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { MentorResponse } from "../../Axios/MentorServer/MentorLoginResponse";


export const MentorLogin = createAsyncThunk('mentor/login',async({email,password})=>{
    const authdata = await MentorResponse(email,password)
    return authdata
})

const MentorauthSlice = createSlice({
    name:'auth',
    initialState:initialstate.MentorToken,
    reducers:{
        mentorLogout:(state)=>{
                state.access = null,
                state.refresh = null,
                state.is_authenticated = false,
                state.is_superuser = false,
                state.type = null,
                state.registerSuccess = null
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(MentorLogin.fulfilled,(state,action)=>{
            state.access = action.payload.access,
            state.refresh = action.payload.refresh,
            state.type= action.payload.type,
            state.is_authenticated = action.payload.is_authenticated,
            state.is_superuser = action.payload.is_superuser,
            state.registerSuccess = null
        })
    }
})


export const {mentorLogout} = MentorauthSlice.actions
export default MentorauthSlice.reducer