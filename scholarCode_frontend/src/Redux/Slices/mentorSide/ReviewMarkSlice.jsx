import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { ReviewMarkList } from "../../../Axios/MentorServer/MentorServer";


export const fetchReviewMarks=createAsyncThunk('user/review_marks',async()=>{
    
    try{
        const res = await ReviewMarkList()
        return res
    }catch(error){
        console.log(error)
    }
})


const ReviewMarkSlice = createSlice({
    name:'reviewMarks',
    initialState:initialstate.ReviewMark,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchReviewMarks.pending,(state)=>{
            state.status = 'Loading'
            state.marks = []
        })
        .addCase(fetchReviewMarks.fulfilled,(state,action)=>{
            state.status = 'Succeeded'
            state.marks = action.payload
        })
        .addCase(fetchReviewMarks.rejected,(state,action)=>{
            state.status = 'Failed'
            state.error = 'action.error.message'
        })
    }
})


export default ReviewMarkSlice.reducer