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
        },
        enrollPatch: (state, action) => {
            const { enroll_id, formData } = action.payload;
            const index = state.enrolls.findIndex((enroll )=> enroll.id === enroll_id);
            console.log('hrishi1',state.enrolls[index])
            
            if (index !== -1) {
                state.enrolls[index] = formData;
            }
            console.log('hrishi2',state.enrolls)
        },
        clearAllEnrolls:(state)=>{
            state.enrolls = []
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
            state.enrolls= ''
            state.error = action.error.message
        })
    }
})

export const { newEnroll ,enrollPatch, clearAllEnrolls} = AllEnrolledCoursesSlice.actions
export default AllEnrolledCoursesSlice.reducer