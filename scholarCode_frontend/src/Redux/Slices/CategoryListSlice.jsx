import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "../Store/rootStore";
import { categoryListInstance } from "../../Axios/AdminServer/AdminServer";

export const fetchCategoryList = createAsyncThunk('admin/categories',async()=>{
    try{
        const response = await categoryListInstance()
        return response
    }
    catch(error){
        throw error
    }
})


const CategoriesSlice=createSlice({
    name:'Categories',
    initialState:initialstate.categoriesList,
    reducers:{
        
        addNewCategory:(state,action)=>{
            state.categories.category.push(action.payload)
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategoryList.pending,(state)=>{
            state.status='loading'

        })
        .addCase(fetchCategoryList.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.categories= action.payload
            state.error= ''
        })
        .addCase(fetchCategoryList.rejected,(state,action)=>{
            state.status='failed'
            state.error = action.error.message

        })
    }
})

export const {addNewCategory} = CategoriesSlice.actions
export default CategoriesSlice.reducer