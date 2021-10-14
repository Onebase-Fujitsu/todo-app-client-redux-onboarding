import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getTasks, patchTask, patchTodo, postTask} from '../features/TaskApi'

export interface Todo {
  id: number
  title: string
  finished: boolean
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: number
  title: string
  todos: Todo[]
  createdAt: string
  updatedAt: string
}

export const getTasksAction = createAsyncThunk<Task[]>(
  'get /tasks',
  async (): Promise<Task[]> => getTasks()
)

export const postTaskAction = createAsyncThunk<
  Task,
  {title: string; todos: string[]}
>('post /tasks', async (arg): Promise<Task> => postTask(arg.title, arg.todos))

export const patchTaskAction = createAsyncThunk<
  Task,
  {taskId: number; title: string}
>(
  'patch /tasks/taskId',
  async (arg): Promise<Task> => patchTask(arg.taskId, arg.title)
)
export const patchTodoAction = createAsyncThunk<
  Todo,
  {taskId: number; todoId: number; title?: string; finished?: boolean}
>(
  'patch /tasks/taskid/todos/todoid',
  async (arg): Promise<Todo> =>
    patchTodo(arg.taskId, arg.todoId, arg.title, arg.finished)
)

export const selectTodoById = (
  tasks: Task[],
  taskId: number,
  todoId: number
) => {
  let returnTodo = {} as Todo
  tasks.map((task) => {
    if (task.id === taskId) {
      task.todos.map((todo) => {
        if (todo.id === todoId) {
          returnTodo = todo
        }
        return null
      })
    }
    return null
  })
  return returnTodo
}

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
            newTodo.updatedAt = action.payload.updatedAt
            newTask.updatedAt = action.payload.updatedAt
          }
          return newTodo
        })
        return newTask
      })
    })
    builder.addCase(patchTaskAction.fulfilled, (state, action) => {
      state.map((task) => {
        const newTask = task
        if (task.id === action.payload.id) {
          newTask.title = action.payload.title
        }
        return newTask
      })
    })
  },
})

export default taskSlice
