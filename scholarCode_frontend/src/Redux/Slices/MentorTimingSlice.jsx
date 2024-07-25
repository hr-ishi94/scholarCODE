import { initialstate } from "../Store/rootStore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MentorReviewTimings } from "../../Axios/MentorServer/MentorServer";


export const fetchMentortimings = createAsyncThunk('mentor/timings', async(mentor_id)=>{
    try{
        const res = await MentorReviewTimings(mentor_id)
        return res
        
    }catch(error){
        console.log("error in fetching timings :",error)
        
    }
})  

const MentorTimingSlice = createSlice({
    name:'Timings',
    initialState:initialstate.Mentor_timings,
    reducers:{
        addTime :(state,action)=>{
            state.timings = [...state.timings,action.payload]
        },
        patchTime :(state,action)=>{
            const index = state.timings.findIndex((time)=>time.id === action.payload.id)
            if (index !== -1){
                state.timings[index] = action.payload
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentortimings.pending,(state)=>{
            state.status = 'loading'
            
        })
        .addCase(fetchMentortimings.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.timings = action.payload
            state.error = ''
            
        })
        .addCase(fetchMentortimings.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
            
        })
    }

})



export const {addTime, patchTime} = MentorTimingSlice.actions
export default MentorTimingSlice.reducer
