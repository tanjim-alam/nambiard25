import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    post: null
};


export const addPost = createAsyncThunk("/addpost", async (data) => {
    try {
        const res = await axios.post("/api/post/add", data);
        return await res.data
    } catch (error) {
        throw new Error(error.message)
        // console.log(error.message)
    }
})

export const getPost = createAsyncThunk("/getpost", async () => {
    try {
        const res = await axios.get("/api/post/get");
        return await res.data
    } catch (error) {
        throw new Error(error.message)
        // console.log(error.message)
    }
})

export const updatePost = createAsyncThunk("", async (data) => {
    try {
        // console.log("data", data)
        const res = await axios.put("/api/post/update", data);
        // console.log(res)
        return res.data;
    } catch (error) {
        throw new Error(error.message)
        // console.log(error.message);
        // return thunkAPI.rejectWithValue(error.message);
    }
});
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPost.fulfilled, (state, action) => {
                // console.log(action);
            })
            .addCase(getPost.fulfilled, (state, action) => {
                // console.log(action);
                state.post = action?.payload?.post;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                // console.log(action);
            })
    }
});

export default postSlice.reducer;