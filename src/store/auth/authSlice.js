// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem("token")

export const login = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const res = await fetch('http://localhost:5050/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    const data = await res.json()
    if (res.ok) {
      dispatch(loginSuccess(data))
    } else {
      dispatch(loginFailure(data.message || "Login failed"))
    }
  } catch (error) {
    dispatch(loginFailure(error.toString()))
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.loading = false
      localStorage.setItem("token", action.payload.token)
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem("token")
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
