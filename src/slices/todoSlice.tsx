import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTodos, postTodo} from '../features/TodoApi'

export interface Todo {
  id: number
  title: string
  finished: boolean
}

export const getTodosAction = createAsyncThunk<Todo[]>(
  'get /todos',
  async (): Promise<Todo[]> => getTodos()
)

export const postTodoAction = createAsyncThunk<Todo, {title: string}>(
  'post /todos',
  async (arg): Promise<Todo> => postTodo(arg.title)
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodosAction.fulfilled, (state, action) => action.payload)
    builder.addCase(postTodoAction.fulfilled, (state, action) => {
      state.push(action.payload)
    })
  },
})

export default todoSlice
