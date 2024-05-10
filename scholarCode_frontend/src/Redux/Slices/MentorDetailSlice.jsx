import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { mentorDetails } from '../../Axios/AdminServer/AdminServer.jsx'


export const fetchMentor = createAsyncThunk('mentor/details',async (id)=>{
    try{
        const response = await mentorDetails(id)
        return response
    }
    catch(error){
        throw error
    }
})

const MentorDetailsSlice = createSlice({
    name:'Mentor',
    initialState:initialstate.mentorDetails,
    reducers:{
        mentorStatus:(state)=>
            {
                state.mentor = {...state.mentor,isActive: !state.mentor.isActive}
                
            },
        mentorApproval:(state)=>{
            state.mentor = {...state.mentor,is_staff : true}
        },
        mentorReject:(state)=>{
            state.mentor = initialstate.mentorDetails.mentor
            

        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentor.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchMentor.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.mentor = action.payload
            state.error = ''
        })
        .addCase(fetchMentor.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })

    }

})

export const {mentorStatus,mentorApproval,mentorReject} = MentorDetailsSlice.actions
export default MentorDetailsSlice.reducer