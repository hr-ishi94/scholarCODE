import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { EnrolledCoursesList } from "../../../Axios/UserServer/UserServer";


export const fetchEnrolledCourses = createAsyncThunk('user/enroll',async ()=>{
    try{
        const res = await EnrolledCoursesList()
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
        newEnroll:(state,action)=>{
            state.enrolls =[...state.enrolls,action.payload]
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchEnrolledCourses.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchEnrolledCourses.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            if (Array.isArray(action.payload)) {
                state.enrolls = action.payload;
            } else {
                state.enrolls = [];
            }
        })
        .addCase(fetchEnrolledCourses.rejected,(state,action)=>{
            state.status = 'failed'
            state.enrolls=''
            state.error = action.error.message
        })
    }
})

export const { newEnroll } = EnrolledCoursesSlice.actions
export default EnrolledCoursesSlice.reducer