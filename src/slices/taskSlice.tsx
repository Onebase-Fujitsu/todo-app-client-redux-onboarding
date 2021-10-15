import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit'
import {normalize, schema} from "normalizr";
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

export interface TaskEntity {
  id: number
  title: string
  todos: EntityState<Todo>
  createdAt: string
  updatedAt: string
}

const todoSchema = new schema.Entity("todos", {})
const taskSchema = new schema.Entity("tasks", {todos: [todoSchema]})
const tasksAdapter = createEntityAdapter<Task>()
const todosAdapter = createEntityAdapter<Todo>()

export const getTasksAction = createAsyncThunk(
  'get /tasks',
  async () => {
    const tasks = await getTasks()


    return normalize<any,
      {
        tasks: Task[],
        todos: Todo[]
      }>(tasks, [taskSchema])
  }
)

export const postTaskAction = createAsyncThunk<Task,
  { title: string; todos: string[] }>('post /tasks', async (arg): Promise<Task> => postTask(arg.title, arg.todos))

export const patchTaskAction = createAsyncThunk<Task,
  { taskId: number; title: string }>(
  'patch /tasks/taskId',
  async (arg): Promise<Task> => patchTask(arg.taskId, arg.title)
)
export const patchTodoAction = createAsyncThunk<Todo,
  { taskId: number; todoId: number; title?: string; finished?: boolean }>(
  'patch /tasks/taskid/todos/todoid',
  async (arg): Promise<Todo> =>
    patchTodo(arg.taskId, arg.todoId, arg.title, arg.finished)
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => {
      tasksAdapter.setMany(state, action.payload.entities.tasks)
    })
  }
})

export const todoSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => {
      todosAdapter.addMany(state, action.payload.entities.todos)
    })
  }
})

export default taskSlice
