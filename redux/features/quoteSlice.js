import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
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
    const receivedData = await response.data
    return receivedData.quote
})

const quoteSlice = createSlice({
    name: "Quote",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(addQuote.fulfilled, (state, action)=>{
            console.log('extra reducer 1', action.payload)
            state.quotes.push(action.payload)
            console.log('quotes', state.quotes)
        })
    }
})

export default quoteSlice.reducer