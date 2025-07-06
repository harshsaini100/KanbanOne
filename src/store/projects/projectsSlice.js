import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utilities/axiosConfiguration'

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async () => {
    try {
        const response = await api.get('/projects/all_items')
        const data = await response.json();
        if (!response.ok) return rejectWithValue(data || "Something went wrong! Try again later.");
        return data;
    } catch (er) {
        return rejectWithValue(err.toString());
    }
})

export const addProject = createAsyncThunk('projects/addProject', async (item, {dispatch}) => {
    try {
        const response = await api.post('/projects/add_project', item)
        const data = await response.json();
        if (!response.ok) return rejectWithValue(data || "Something went wrong! Try again later.");
        return data;
    } catch (er) {
        return rejectWithValue(err.toString());
    }
})

const projectsSlice = createSlice(
    {
        name: "projects",
        initialState: {
            items: [],
            loading: false,
            error: null,
        },
        extraReducers: (builder) => {
            builder.addCase(getAllProjects.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getAllProjects.fulfilled, (state, action) => {
                state.items = action.payload
            })
        }
})

export default projectsSlice.reducer;