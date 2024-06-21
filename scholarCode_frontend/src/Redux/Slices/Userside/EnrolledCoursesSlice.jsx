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
        newEnroll:(state,action)=>{
            state.enrolls = [...state.enrolls,action.payload]
        }, 
        enrollPut: (state, action) => {
            const { enroll_id, formData } = action.payload;
            const index = state.enrolls.findIndex((enroll )=> enroll.id === enroll_id);
            console.log('hrishi',index,enroll_id,formData)
            if (index !== -1) {
                state.enrolls[index] = formData;
            }
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

export const { newEnroll,enrollPut } = EnrolledCoursesSlice.actions
export default EnrolledCoursesSlice.reducer