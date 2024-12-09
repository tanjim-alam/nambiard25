import axiosInstance from "@/utils/axiosInstance";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    blog: null,
    blogs: []
};

export const addBlog = createAsyncThunk("/addblog", async (data) => {
    try {
        const res = axiosInstance.post("/blog/add", data);
        return (await res).data;
    } catch (error) {
        // console.log(error.message);
        throw new Error(error.message)
    }
});


export const getAllBlogs = createAsyncThunk("/getblogs", async () => {
    try {
        const res = axiosInstance.get("/blog/get-all");
        return (await res).data;
    } catch (error) {
        // console.log(error.message);
        throw new Error(error.message)
    }
})

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addBlog.fulfilled, (state, action) => {
                // console.log(action);
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                // console.log(action);
                state.blogs = action?.payload?.blogs;
            })
    }
});

export default blogSlice.reducer;