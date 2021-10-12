import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTasks, postTask} from '../features/TaskApi'

export interface Todo {
  id: number
  title: string
  finished: boolean
}

export interface Task {
  id: number
  title: string
  todos: Todo[]
}

export const getTasksAction = createAsyncThunk<Task[]>(
  'get /tasks',
  async (): Promise<Task[]> => getTasks()
)

export const postTaskAction = createAsyncThunk<Task, {title: string, todos: string[]}>(
  'post /task',
  async (arg): Promise<Task> => postTask(arg.title, arg.todos)
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => action.payload)
    builder.addCase(postTaskAction.fulfilled, (state, action) => {state.push(action.payload)})
  }
})

export default taskSlice
