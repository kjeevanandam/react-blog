import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "../../app/config";

const API_URL = Config.APP_URL+'users'

const initialState = []

// Fetch all the users from API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const response = await axios.get(API_URL)
    return response.data
})

// creating user slice
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users
export const userById = (state, userId) => state.users.find(user => user.id === userId)
export default userSlice.reducer