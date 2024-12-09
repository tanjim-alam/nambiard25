"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import blogReducer from "./slices/blogSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        blog: blogReducer
    }
});


export default store;
