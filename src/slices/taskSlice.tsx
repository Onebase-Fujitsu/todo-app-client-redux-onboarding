import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTasks, patchTodo, postTask} from '../features/TaskApi'

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

export const postTaskAction = createAsyncThunk<
  Task,
  {title: string; todos: string[]}
>('post /tasks', async (arg): Promise<Task> => postTask(arg.title, arg.todos))

export const patchTodoAction = createAsyncThunk<
  Todo,
  {taskId: number; todoId: number; title?: string; finished?: boolean}
>(
  'patch /tasks/taskid/todos/todoid',
  async (arg): Promise<Todo> =>
    patchTodo(arg.taskId, arg.todoId, arg.title, arg.finished)
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: [] as Task[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => action.payload)
    builder.addCase(postTaskAction.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(patchTodoAction.fulfilled, (state, action) => {
      state.map((task) => {
        const newTask = task
        newTask.todos = task.todos.map((todo) => {
          const newTodo = todo
          if (todo.id === action.payload.id) {
            newTodo.title = action.payload.title
            newTodo.finished = action.payload.finished
          }
          return newTodo
        })
        return newTask
      })
    })
  },
})

export default taskSlice
