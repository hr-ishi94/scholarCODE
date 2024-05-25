import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { EnrolledCoursesList } from "../../../Axios/UserServer/UserServer";


export const fetchEnrolledCourses = createAsyncThunk('user/enroll',async (id)=>{
    try{
        const res = await EnrolledCoursesList(id)
        return res
    }
    catch(error){
        throw error
    }
})


const EnrolledCoursesSlice = createSlice({
    name:'enrolls',
    initialState:initialstate.EnrolledCourses,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEnrolledCourses.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchEnrolledCourses.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.enrolls = action.payload
        })
        .addCase(fetchEnrolledCourses.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})


export default EnrolledCoursesSlice.reducer