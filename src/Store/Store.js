import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './Feautures/ProductSlice'
import  userSlice  from './Feautures/UserSlice'
import AppApi from '../Services/AppApi'

// Now persisting the store

import storage from 'redux-persist/lib/storage'
import {combineReducers} from 'redux'
import  {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk'

// reducers

const reducer = combineReducers({
    user: userSlice,
    products: ProductSlice,
    [AppApi.reducerPath]:AppApi.reducer

})  


const persistConfig= {
    key:'root',
    storage,
    blacklist: [AppApi.reducerPath,'products']
}

//Now persist the store

const persistedReducer = persistReducer(persistConfig, reducer)

// Now creating the store

const store  = configureStore({
    reducer: persistedReducer,
    middleware:[thunk,AppApi.middleware]
})

export default store