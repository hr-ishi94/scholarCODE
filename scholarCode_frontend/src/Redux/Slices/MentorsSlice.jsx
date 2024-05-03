import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { MentorsListInstance } from "../../Axios/AdminServer/AdminServer";

export const fetchMentors=createAsyncThunk('admin/mentors/',async ()=>{
    try{
        const response = await MentorsListInstance()
        return response
    }
    catch(error){
        throw error
    }
})

const MentorsSlice= createSlice({
    name:"Mentors",
    initialState:initialstate.mentorsList,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentors.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchMentors.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.mentors = action.payload;
            state.error = ''
        })
        .addCase(fetchMentors.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }   

})

export default MentorsSlice.reducer