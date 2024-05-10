import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { userDetailsInstance } from '../../Axios/AdminServer/AdminServer.jsx'

export const fetchUser = createAsyncThunk('user/details',async(id)=>{
    try{

        const res = await userDetailsInstance(id)
        return res
    }
    catch(error){
        throw error
    }

})

const userDetailsSlice = createSlice({
    name:"user",
    initialState:initialstate.userDetails,
    reducers:{
        blockUser:(state)=>{
           state.user= {...state.user,isactive: !state.user.isactive
           }
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.user = action.payload
            state.error = ''
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message
        })
    }

})

export const {blockUser} = userDetailsSlice.actions
export default userDetailsSlice.reducer