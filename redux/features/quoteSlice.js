import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    quotes: [],
    loading: false,
    error: '',
    noMore: false
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
    const {token, limit, skip} = data
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }
    const response = await axios.post(
        'https://quoteshare.onrender.com/quote/fetchAll',
        {
            limit,
            skip
        },
        config
    )
    const quotes = await response.data
    console.log(quotes)
    return quotes
})

export const like = (createAsyncThunk('quote/addLike', async (data) => {
    const {liked, token, quoteId, quoteIndex, username} = data
    
    const config = {
        headers: {
            'authorization': `Bearer ${token}`
        }
    }

    if (!liked){
        await axios.post('https://quoteshare.onrender.com/quote/addLike', {quoteId}, config)
    } else {

        await axios.post('https://quoteshare.onrender.com/quote/removeLike', {quoteId}, config)
    }

    return {quoteId, username, quoteIndex}
}))

const quoteSlice = createSlice({
    name: "Quote",
    initialState,
    reducers: {
        resetQuotes: (state, action) => {
            state.quotes = []
            state.error = ''
            state.noMore = false
            state.loading = false
        }
    },

    extraReducers: (builder)=>{
        builder.addCase(addQuote.fulfilled, (state, action)=>{
            console.log('extra reducer 1', action.payload)
            
            state.quotes.push(action.payload)
            console.log('quotes', state.quotes)
        })

        builder.addCase(fetchQuotes.fulfilled, (state, action)=>{
            if (action.payload.quotes.length<3){
                state.noMore=true
            }
            state.quotes.push(...action.payload.quotes)
            state.loading = false
        })

        builder.addCase(fetchQuotes.pending, (state, action)=>{
            state.loading=true
            state.error = ''
        })

        builder.addCase(like.fulfilled, (state, action)=>{
            const {quoteIndex, username} = action.payload
            // const usernameIndex = state.quotes[quoteIndex].likes.indexOf(username)
            state.quotes[quoteIndex].likes.push(username)
        })
    }
})

export default quoteSlice.reducer
export const {resetQuotes} = quoteSlice.actions