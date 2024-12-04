import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    user: null,
    isAuthenticated: false,
    role: null,
    status: 'idle',
    error: null,
};

export const login = createAsyncThunk("/login", async (data) => {
    try {
        const res = await axiosInstance.post("/auth/login", data);
        return await res.data
    } catch (error) {
        throw new Error(error.message)
        // console.log(error.message)
    }
});

// Async thunk for fetching profile
export const getProfile = createAsyncThunk('auth/getProfile', async (token) => {
    // console.log("token", token)
    try {
        const response = await axiosInstance.get('/auth/profile', { headers: { Authorization: token } });
        // console.log("res", response)
        return response.data;
    } catch (error) {
        throw new Error(error.message)
        // console.log("error.message1", error.message)
    }
});

export const logout = createAsyncThunk('auth/logout', async (token) => {
    // console.log("token", token)
    try {
        const response = await axios.post('/api/auth/logout', { headers: { Authorization: token } });
        // console.log("res", response)
        return response.data;
    } catch (error) {
        throw new Error(error.message)
        // console.log("error.message1", error.message)
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                // console.log(action);
                localStorage.setItem("token", JSON.stringify(action.payload.data.token))
            })
            .addCase(getProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                // console.log("action", action)
                state.status = 'succeeded';
                state.user = action?.payload?.user;
                state.role = action.payload?.user?.role;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                // console.log("action", action)
                state.status = 'failed';
                state.error = action.error.message;
                state.isAuthenticated = false;
                state.role = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.role = null;
                state.user = null;
                state.role = null;
            })
    }
});

export default authSlice.reducer;