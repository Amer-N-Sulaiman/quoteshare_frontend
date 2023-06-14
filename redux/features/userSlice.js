import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const login = createAsyncThunk('user/login', async (data)=>{
    const {username, password} = data
    const response = await axios.post(
        'http://localhost:4000/auth/login',
        {
            username,
            password
        }
    )
    const user = await response.data
    return user
})


const initialState = {
    user: null
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            console.log('action payload', action.payload)
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer