import { createSlice,createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import Config from "../../app/config";

const API_URL = Config.APP_URL+'posts'

const initialState = {
    posts: [],
    status: "idle",
    error: null,
    count: 0
}

// Fetch all the posts 
export const fetchPosts =  createAsyncThunk('posts/fetchPosts', async()=> {
    const response = await axios.get(API_URL)
    return response.data
})

// Add a new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async(postData) => {
    const response = await axios.post(API_URL, postData)
    return response.data
})

// Update the post 
export const updatePost = createAsyncThunk('posts/updatePost', async(postData) => {
    const { id } = postData
    try{
        const response = await axios.put(`${API_URL}/${id}`, postData)
        return response.data
    }catch(err){
        return postData
    }
})

// Delete the post
export const deletePost = createAsyncThunk('posts/deletePost', async(postData) => {
    const { id } = postData
    try{
        const response = await axios.delete(`${API_URL}/${id}`)
        if(response?.status === 200)  return postData
        return `${response?.status}: ${response?.statusText}`
    }catch(err){
        return err.message
    }
})

// Creating posts slice
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        increaseCount(state, action) {
            state.count = state.count+1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++ }).toISOString()
                    return post;
                })

                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const sortedPosts = state.posts.sort((a,b) => {
                    if(a.id > b.id) return 1
                    if(a.id < b.id) return -1
                    return 0    
                })
                action.payload.id = sortedPosts[sortedPosts.length -1].id+1;
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Update could not complete');
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter((post) => post.id !== id)
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                    console.log('Update could not complete');
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload
                const posts = state.posts.filter((post) => post.id !== id)
                state.post = posts
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts
export const getPostStatus = (state) => state.posts.status
export const getPostError = (state) => state.posts.error
export const getCount = (state) => state.posts.count
export const postById = (state, postId) => state.posts.posts.find( post => post.id === postId)
export const postByUserId = createSelector(
    [selectAllPosts, (state, userId) => userId], 
    (posts, userId) => posts.filter(post => post.userId === userId)
)
export default postSlice.reducer;
