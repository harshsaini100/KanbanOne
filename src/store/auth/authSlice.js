import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
const token = localStorage.getItem("token");
export const login = createAsyncThunk("auth/login", async (credentials, {rejectWithValue}) => {
  try {
    const res = await fetch('http://localhost:5050/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data || "Login failed");
    return data;
  } catch (err) {
    return rejectWithValue(err.toString());
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: token || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

