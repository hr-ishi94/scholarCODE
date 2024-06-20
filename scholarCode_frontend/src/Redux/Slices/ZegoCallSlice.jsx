import { createSlice } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";


const ZegoCallSlice = createSlice({
    name:'calls',
    initialState:initialstate.ZegoCalls,
    reducers:{
        addLink:(state,action)=>{
            state.links = [...state.links,action.payload]
        },
        removeLink:(state,action) => {
            state.links = state.links.filter((link)=> link !== action.payload)
        },
        clearLinks:(state)=>{
            state.links = []
        }
    }
})

export const {addLink,removeLink,clearLinks} =ZegoCallSlice.actions
export default ZegoCallSlice.reducer