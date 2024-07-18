import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { adminTransactions } from "../../Axios/AdminServer/AdminServer";

export const fetchadminTransactions = createAsyncThunk('admin/transactions', async ()=>{
    try{
        const res = await adminTransactions()
        return res
    }catch(error){
        console.log(error)
    }
})

const AdminTransactionSlice = createSlice({
    name:'Transactions',
    initialState:initialstate.Transactions,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder 
        .addCase(fetchadminTransactions.pending,(state)=>{
            state.status ='loading'
        })
        .addCase(fetchadminTransactions.fulfilled,(state,action)=>{
            state.status ='succeeded'
            state.transactions = action.payload
            
        })
        .addCase(fetchadminTransactions.rejected,(state,action)=>{
            state.status = 'failed'
            state.transactions = null
            state.error  = action.error.message
        })
    }
})

export default AdminTransactionSlice.reducer