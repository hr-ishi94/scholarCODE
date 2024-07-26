import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { MentorTransactions } from "../../../Axios/MentorServer/MentorServer";


export const fetchMentorTransactions = createAsyncThunk('mentor/transactions',async (wallet_id) =>{
    try{
        const res = await MentorTransactions(wallet_id)
        return res
    }catch(error){
        console.log(error.response)
    }
})


const MentorTransactionSlice = createSlice({
    name:'mentor_transactions',
    initialState:initialstate.Mentor_transactions,
    reducers:{
        addTransaction :(state,action)=>{
            state.transactions = [...state.transactions,action.payload]
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentorTransactions.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchMentorTransactions.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.transactions = action.payload
            state.error = ''
        })
        .addCase(fetchMentorTransactions.rejected,(state)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const {addTransaction} = MentorTransactionSlice.actions
export default MentorTransactionSlice.reducer