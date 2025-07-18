import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utilities/axiosConfiguration'

export const getAllProjects = createAsyncThunk('projects/getAllProjects', async () => {
    try {
        const response = await api.get('/projects/all_items')
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const addProject = createAsyncThunk('projects/addProject', async (item, {dispatch}) => {
    try {
        const response = await api.post('/projects/add_project', item)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id, {dispatch}) => {
    try {
        const response = await api.delete('/projects/delete_project/'+id)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const getProject = createAsyncThunk('projects/getProject', async (id, {dispatch}) => {
    try {
        const response = await api.get('/projects/get_project/'+id)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

const projectsSlice = createSlice(
    {
        name: "projects",
        initialState: {
            items: [],
            loading: false,
            project: {},
            error: null,
        },
        extraReducers: (builder) => {
            builder.addCase(getAllProjects.pending, (state)=>{
                state.items = [];
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getAllProjects.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false;
                state.error = null;
            })
            builder.addCase(getAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(addProject.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(addProject.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload)
                state.error = null;
            })
            builder.addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(deleteProject.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(deleteProject.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item._id != action.payload.id)
                state.error = null;
            })
            builder.addCase(deleteProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(getProject.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload
                state.error = null;
            })
            builder.addCase(getProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
        }
})

export default projectsSlice.reducer;