import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  AdminWalletInstance } from "../../Axios/AdminServer/AdminServer";
import { initialstate } from "../Store/rootStore";

export const fetchAdminWallet = createAsyncThunk('admin/wallet',async () =>{
    try{
        const res = await AdminWalletInstance()
        return res
    }
    catch(error){
        console.log('error',error)
    }
})

const AdminWalletSlice = createSlice({
    name:'admin-wallet',
    initialState:initialstate.Admin_wallet,
    reducers:{
        updateAdminWallet:(state,action)=>{
            state.wallet = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAdminWallet.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchAdminWallet.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.wallet = action.payload
            state.error = ''
        })
        .addCase(fetchAdminWallet.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message

        })
    }
})

export const {updateAdminWallet} = AdminWalletSlice.actions
export default AdminWalletSlice.reducer

