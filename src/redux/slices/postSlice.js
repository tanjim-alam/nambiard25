import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    post: null
};


export const addPost = createAsyncThunk("/addpost", async (data) => {
    try {
        const res = await axiosInstance.post("/post/add", data);
        return await res.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const getPost = createAsyncThunk("/getpost", async () => {
    try {
        const res = await axiosInstance.get("/post/get");
        return await res.data
    } catch (error) {
        throw new Error(error.message)
    }
})

export const updatePost = createAsyncThunk("", async (data) => {
    try {
        const res = await axiosInstance.put("/post/update", data);
        return res.data;
    } catch (error) {
        throw new Error(error.message)
    }
});
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPost.fulfilled, (state, action) => {
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.post = action?.payload?.post;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
            })
    }
});

export default postSlice.reducer;