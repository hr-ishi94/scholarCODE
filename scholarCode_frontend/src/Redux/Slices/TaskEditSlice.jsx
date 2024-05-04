import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { tasksEditInstance } from "../../Axios/AdminServer/AdminServer";


export const fetchTask = createAsyncThunk('admin/course/task',async()=>{
    try{
        const res = await tasksEditInstance()
        
        return res
    }
    catch(error){
        throw error
    }
})


const TaskEditSlice = createSlice({
    name:'TaskEdit',
    initialState:initialstate.tasks,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTask.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchTask.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.task = action.payload
            state.error=''

        })
        .addCase(fetchTask.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message

        })
    }
})


export default TaskEditSlice.reducer