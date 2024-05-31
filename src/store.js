import {configureStore} from '@reduxjs/toolkit'
import userReducer from './components/slices/userSlice'

export const store=configureStore({
    reducer:{
        user:userReducer
    }
})
