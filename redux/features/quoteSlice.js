import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    quotes: [],
    loading: false,
    error: ''
}

export const addQuote = createAsyncThunk('quote/add', async(data)=>{
    const {author, quote, token} = data
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(
        'https://quoteshare.onrender.com/quote/add',
        {
            author,
            quote
        },
        config
    )
    const receivedData = await response.data
    return receivedData.quote
})

export const fetchQuotes = createAsyncThunk('quote/fetch', async(data)=>{
    const {token} = data
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    const response = await axios.get(
        'https://quoteshare.onrender.com/quote/fetchAll',
        config
    )
    const quotes = await response.data
    console.log(quotes)
    return quotes
})

export const addLike = (createAsyncThunk('quote/addLike', async (data) => {
    const {token, quoteId, quoteIndex, username} = data
    
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    
    const response = await axios.post('https://quoteshare.onrender.com/quote/addLike', {quoteId}, config)
    return {quoteId, username, quoteIndex}
}))

const quoteSlice = createSlice({
    name: "Quote",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(addQuote.fulfilled, (state, action)=>{
            console.log('extra reducer 1', action.payload)
            state.quotes.push(action.payload)
            console.log('quotes', state.quotes)
        })

        builder.addCase(fetchQuotes.fulfilled, (state, action)=>{
            state.quotes = action.payload.quotes
        })

        builder.addCase(addLike.fulfilled, (state, action)=>{
            const {quoteIndex, username} = action.payload
            // const usernameIndex = state.quotes[quoteIndex].likes.indexOf(username)
            state.quotes[quoteIndex].likes.push(username)
        })
    }
})

export default quoteSlice.reducer