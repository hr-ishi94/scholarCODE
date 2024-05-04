import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { coursesListInstance } from "../../Axios/AdminServer/AdminServer";


export const fetchCoursesList = createAsyncThunk('admin/courses',async()=>{
    try{
        const res = await coursesListInstance()
        
        return res
    }
    catch(error){
        throw error
    }
})


const CoursesSlice = createSlice({
    name:'Courses',
    initialState:initialstate.coursesList,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCoursesList.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchCoursesList.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.courses = action.payload
            state.error=''

        })
        .addCase(fetchCoursesList.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message

        })
    }
})


export default CoursesSlice.reducer