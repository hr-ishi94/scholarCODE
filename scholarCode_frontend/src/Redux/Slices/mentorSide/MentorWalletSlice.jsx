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
        patchWallet: (state, action) => {
            // Debugging: Log the action payload
            console.log('Action Payload:', action.payload);
            if (!Array.isArray(state.wallet)) {
                state.wallet = [];  // Initialize as an empty array if not already an array
            }
            console.log(state.wallet,'hey')
            
            const index = state.wallet.findIndex((wlt) => wlt.id == action.payload.id);
            if (index !== -1) {
              state.wallet[index] = action.payload;
            } else {
              console.error('Wallet item not found');
            }
          },
          clearWallet:(state)=>{
            state.wallet = []
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

export const {patchWallet,clearWallet} = MentorWalletSlice.actions
export default MentorWalletSlice.reducer