import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const login = createAsyncThunk('user/login', async (data)=>{
    const {username, password} = data
    
    const response = await axios.post(
        'https://quoteshare.onrender.com/auth/login',
        {
            username,
            password
        }
    ).catch((error)=>{
        throw Error(error.response.data.error)
    })
    const user = await response.data
    return user
    
})

export const signup = createAsyncThunk('user/signup', async (data)=>{
    const {full_name, username, password} = data
    const response = await axios.post(
        'https://quoteshare.onrender.com/auth/signup',
        {
            full_name,
            username,
            password
        }
    ).catch((error)=>{
        throw Error(error.response.data.error)
    })
    const user = await response.data
    return user
    
})


const initialState = {
    user: null,
    error: ''
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = null
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload
            state.error = ''
            localStorage.setItem('user', JSON.stringify(action.payload))

        })

        builder.addCase(login.rejected, (state, action)=>{
            state.error = action.error.message
        })

        builder.addCase(signup.fulfilled, (state, action)=>{
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })

        builder.addCase(signup.rejected, (state, action)=>{
            state.error = action.error.message
        })
    }
})

export const {setUser, logout} = userSlice.actions
export default userSlice.reducer