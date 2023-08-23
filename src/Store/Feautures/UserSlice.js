import {createSlice} from '@reduxjs/toolkit'
import AppApi from '../../Services/AppApi'

//AppApi 
const initialState = null

export const userSlice = createSlice({
    name:'user',

    initialState,
    
    reducers:{
        logout: ()=> initialState,      
    },
    
    extraReducers: (builder) => {
        builder.addMatcher(AppApi.endpoints.register.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.login.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.addToCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.removeFromCart.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.increaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.decreaseCartProduct.matchFulfilled, (_, { payload }) => payload);
        builder.addMatcher(AppApi.endpoints.createOrder.matchFulfilled, (_, { payload }) => payload);
    
      },
    });


export const {logout} = userSlice.actions
export default userSlice.reducer