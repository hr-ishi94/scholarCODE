import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { usersListInstance } from "../../Axios/AdminServer/AdminServer";


export const fetchUsers = createAsyncThunk('admin/users/',async () =>{
    try{
        const response = await usersListInstance()
        return response
    }
    catch(error){
        throw error
    }
})



const usersListSlice = createSlice({
    name:"AllUsers",
    initialState:initialstate.userList,
    reducers:{
       
    },
    extraReducers:(builder) =>{
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = action.payload;
            state.error =""
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
})

export default usersListSlice.reducer 