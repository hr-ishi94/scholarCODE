import { initialstate } from "../Store/rootStore"
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { tasksListInstance } from "../../Axios/AdminServer/AdminServer"


export const fetchTasksList = createAsyncThunk('admin/course/tasks',async(courseId)=>{
    try{
        const res = await tasksListInstance(courseId)
        
        return res
    }
    catch(error){
        throw error
    }
})



const TasksSlice = createSlice({
    name:'tasks',
    initialState:initialstate.taskList,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTasksList.pending,(state)=>{
            state.status = 'loading'

        })
        .addCase(fetchTasksList.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.tasks = action.payload
            state.error=''

        })
        .addCase(fetchTasksList.rejected,(state,action)=>{
            state.tasks=[]
            state.status = 'failed'
            state.error = action.error.message

        })
    }
})


export default TasksSlice.reducer