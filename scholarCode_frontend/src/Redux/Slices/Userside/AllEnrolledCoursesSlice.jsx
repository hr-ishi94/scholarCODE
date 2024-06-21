import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { EnrolledAllCourses } from "../../../Axios/UserServer/UserServer";


export const fetchAllEnrolledCourses = createAsyncThunk('user/enroll',async ()=>{
    try{
        const res = await EnrolledAllCourses()
        return res
    }
    catch(error){
        throw error
    }
})


const AllEnrolledCoursesSlice = createSlice({
    name:'enrolls',
    initialState:initialstate.AllEnrolledCourses,
    reducers:{
        newEnroll:(state,action)=>{
            state.enrolls =[...state.enrolls,action.payload]
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllEnrolledCourses.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAllEnrolledCourses.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            if (Array.isArray(action.payload)) {
                state.enrolls = action.payload;
            } else {
                state.enrolls = [];
            }
        })
        .addCase(fetchAllEnrolledCourses.rejected,(state,action)=>{
            state.status = 'failed'
            state.enrolls=''
            state.error = action.error.message
        })
    }
})

export const { newEnroll } = AllEnrolledCoursesSlice.actions
export default AllEnrolledCoursesSlice.reducer