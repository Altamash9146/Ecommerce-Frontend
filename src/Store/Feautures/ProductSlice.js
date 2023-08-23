import {createSlice} from '@reduxjs/toolkit'
import AppApi from '../../Services/AppApi'

//AppApi 
const initialState = []

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProducts: (_, action) => {
            return action.payload;
        },
    },
    extraReducers:(builder) =>{
        builder.addMatcher(AppApi.endpoints.createProduct.matchFulfilled, (_,{payload}) => payload)
        builder.addMatcher(AppApi.endpoints.updateProduct.matchFulfilled, (_,{payload}) => payload)
        builder.addMatcher(AppApi.endpoints.deleteProduct.matchFulfilled, (_,{payload}) => payload)
    }
})

export const {updateProducts} = productSlice.actions
export default productSlice.reducer