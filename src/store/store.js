import { configureStore } from '@reduxjs/toolkit'
import  tasksSlice  from './tasks/tasksSlice'
export default configureStore({
  reducer: {
    tasks: tasksSlice
  },
})