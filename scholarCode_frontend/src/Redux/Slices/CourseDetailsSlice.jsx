import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { courseDetails } from "../../Axios/AdminServer/AdminServer";


export const fetchCourseDetails = createAsyncThunk('admin/course/details',async(id)=>{
    try{
        const res = await courseDetails(id)
        
        return res
    }
    catch(error){
        console.log(error)
    }
})


const CourseDetailsSlice = createSlice({
    name:'CourseDetails',
    initialState:initialstate.courseDetails,
    reducers:{
        updateCourse:(state,action)=>{
            state.course = action.payload;
            
        },
        blockCourse:(state)=>{
            state.course = {...state.course,status :!state.course.status
            }
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCourseDetails.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchCourseDetails.fulfilled,(state,action)=>{
            state.course = action.payload
            state.status = 'succeeded'
            state.error=''

        })
        .addCase(fetchCourseDetails.rejected,(state,action)=>{
            state.status = 'failed'
            state.course = null
            state.error = action.error.message

        })
    }
})

export const { updateCourse,blockCourse } = CourseDetailsSlice.actions
export default CourseDetailsSlice.reducer