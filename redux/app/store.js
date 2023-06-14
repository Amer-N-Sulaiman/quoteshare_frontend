import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import quoteReducer from '../features/quoteSlice'

const store = configureStore({
    reducer: {
        'user': userReducer,
        'quote': quoteReducer
    }
})

export default store;