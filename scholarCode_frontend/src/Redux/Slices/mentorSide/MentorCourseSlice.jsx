import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MentorCourseAssign, MentorCourseList } from "../../../Axios/MentorServer/MentorServer";
import { initialstate } from "../../Store/rootStore";

export const fetchMentorCourse =createAsyncThunk('mentor/course',async(id)=>{

    try{
        const response = await MentorCourseList(id)
        return response
    }
    catch(error){
        console.log("mentor fetching error")
    }
})


const MentorCourseSlice = createSlice({
    name:'mentorCourse',
    initialState:initialstate.MentorCourses,
    reducers:{
        addCourse :(state,action)=>{
            state.courses=[...state.courses,action.payload]
        },
        clearCourse:(state)=>{
            return initialstate.MentorCourses
        },
        relieveCourse: (state, action) => {
            state.courses=state.courses.filter((mentorCourse) => mentorCourse.id !== action.payload)
            }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentorCourse.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchMentorCourse.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.courses = action.payload
            state.error = ''
        })
        .addCase(fetchMentorCourse.rejected,(state,action)=>{
            state.status= 'failed'
            state.error = action.error.message
        })
    }
})

export const {addCourse,clearCourse,relieveCourse} = MentorCourseSlice.actions
export default MentorCourseSlice.reducer