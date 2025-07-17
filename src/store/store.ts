import { configureStore } from '@reduxjs/toolkit'
import  tasksSlice  from './tasks/tasksSlice'
import authSlice from './auth/authSlice'
import projectsSlice from './projects/projectsSlice'
import boardsSlice from './boards/boardsSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    auth: authSlice,
    projects:projectsSlice,
    boards:boardsSlice
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch