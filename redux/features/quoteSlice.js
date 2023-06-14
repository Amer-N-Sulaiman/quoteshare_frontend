import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialSlice = {
    quotes: [],
    loading: false,
    error: ''
}

export const addQuote = createAsyncThunk('quote/fetch', async(data)=>{
    const {author, quote, token} = data
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(
        'http://localhost:4000/quote/add',
        {
            author,
            quote
        },
        config
    )
    
    const createdQuote = await response.data
    return createdQuote
})

const quoteSlice = createSlice({
    name: "Quote",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(addQuote.fulfilled, (state, action)=>{
            state.quotes.push(action.payload)
            console.log('quotes', state.quotes)
        })
    }
})

export default quoteSlice.reducer