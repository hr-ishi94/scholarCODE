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
        addCourse :(state,action)=>{
            state.courses=[...state.courses,action.payload]
        },
        resetState: () => initialstate.coursesList
        

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

export const {addCourse ,resetState} = CoursesSlice.actions
export default CoursesSlice.reducer