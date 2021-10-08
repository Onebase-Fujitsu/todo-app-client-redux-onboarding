import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTodos} from '../features/TodoApi'

export interface Todo {
  id: number
  title: string
  finished: boolean
}

export const getTodosAction = createAsyncThunk<Todo[]>(
  'get /todos',
  async (): Promise<Todo[]> => getTodos()
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodosAction.fulfilled, (state, action) => action.payload)
  },
})

export default todoSlice
