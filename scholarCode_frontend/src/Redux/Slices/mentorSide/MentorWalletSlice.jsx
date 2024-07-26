import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../../Store/rootStore";
import { MentorWallet } from "../../../Axios/MentorServer/MentorServer";

export const fetchMentorWallet = createAsyncThunk('mentor/wallet',async (mentor_id)=>{
    try{
        const res = await MentorWallet(mentor_id)
        return res

    }catch(error){
        console.log(error.response)
    }
})


const MentorWalletSlice = createSlice({
    name:'mentor_wallet',
    initialState:initialstate.Mentor_wallet,
    reducers:{
        patchWallet :(state,action)=>{
            const index = state.wallet.findIndex((wallet)=>wallet.id === action.payload.id)
            if (index !== -1){
                state.wallet[index] = action.payload
            }
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchMentorWallet.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchMentorWallet.fulfilled,(state,action)=>{
            state.status = 'succeeeded'
            state.wallet = action.payload
            state.error = '';
        })
        .addCase(fetchMentorWallet.rejected,(state)=>{
            state.status = 'failed'
            state.error = action.error 
        })
    }
})

export const {patchWallet} = MentorWalletSlice.actions
export default MentorWalletSlice.reducer