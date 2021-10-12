import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTasks, getTodos, postTodo} from '../features/TaskApi'

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

export const getTodosAction = createAsyncThunk<Todo[]>(
  'get /todos',
  async (): Promise<Todo[]> => getTodos()
)

export const postTodoAction = createAsyncThunk<Todo, {title: string}>(
  'post /todos',
  async (arg): Promise<Todo> => postTodo(arg.title)
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => action.payload)}
})

export default taskSlice
