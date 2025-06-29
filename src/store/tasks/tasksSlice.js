import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import api from '../../utilities/axiosConfiguration'

export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async () => {
        const response = await api.get('/tasks/all_items')
        return response.data
    }
)


export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (item, {dispatch}) => {
        const response = await api.post('/tasks/add', item)
        if(response.status == 200){
            dispatch(getAllTasks())
        }
        return response.data

    }
)

export const updateStatus = createAsyncThunk(
    'tasks/updateStatus',
    async (item, {dispatch}) => {
        const response = await api.patch('/tasks/updateStatus/'+item.id, item.payload)
        if(response.status == 200){
            dispatch(getAllTasks())
        }
        return response.data

    }
)


export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, {dispatch}) => {
    const response = await api.delete(`/tasks/delete/${id}`)
    if(response.status === 200) {
      dispatch(getAllTasks())
    }
    return response.data
  }
)


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTasks: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })     
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
       .addCase(updateStatus.pending, (state) => {
         state.loading = true;
          state.error = null;
      })
       .addCase(updateStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
       .addCase(updateStatus.rejected, (state) => {
        state.loading = false;
        state.error = action?.error?.message;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;