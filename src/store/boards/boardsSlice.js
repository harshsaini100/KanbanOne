import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utilities/axiosConfiguration'

export const getAllBoards = createAsyncThunk('boards/getAllBoards', async (id) => {
    try {
        const response = await api.get('/boards/boards_by_project/'+id)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const addBoard = createAsyncThunk('boards/addBoard', async (item, {dispatch}) => {
    try {
        const response = await api.post('/boards/create_board', item)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id, {dispatch}) => {
    try {
        const response = await api.delete('/boards/delete_board/'+id)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

export const getBoard = createAsyncThunk('boards/getBoard', async (id, {dispatch}) => {
    try {
        const response = await api.get('/boards/get_board/'+id)
        return response.data;
    } catch (er) {
        return rejectWithValue(err);
    }
})

const boardsSlice = createSlice(
    {
        name: "boards",
        initialState: {
            items: [],
            loading: false,
            board: {},
            error: null,
        },
        extraReducers: (builder) => {
            builder.addCase(getAllBoards.pending, (state)=>{
                state.items = [];
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getAllBoards.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false;
                state.error = null;
            })
            builder.addCase(getAllBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(addBoard.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(addBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload)
                state.error = null;
            })
            builder.addCase(addBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(deleteBoard.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(deleteBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item._id != action.payload.id)
                state.error = null;
            })
            builder.addCase(deleteBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
            builder.addCase(getBoard.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            builder.addCase(getBoard.fulfilled, (state, action) => {
                state.loading = false;
                state.board = action.payload
                state.error = null;
            })
            builder.addCase(getBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.error?.message;
            })
        }
})

export default boardsSlice.reducer;
