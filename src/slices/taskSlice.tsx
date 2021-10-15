import {createAsyncThunk, createEntityAdapter, createSlice, EntityId, EntityState} from '@reduxjs/toolkit'
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
  todos: EntityId[]
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
export const tasksAdapter = createEntityAdapter<Task>()
export const todosAdapter = createEntityAdapter<Todo>()

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
  { taskId: EntityId; title: string }>(
  'patch /tasks/taskId',
  async (arg): Promise<Task> => patchTask(arg.taskId, arg.title)
)
export const patchTodoAction = createAsyncThunk<Todo,
  { taskId: EntityId; todoId: EntityId; title?: string; finished?: boolean }>(
  'patch /tasks/taskid/todos/todoid',
  async (arg): Promise<Todo> =>
    patchTodo(arg.taskId, arg.todoId, arg.title, arg.finished)
)

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {domainData: {tasks: tasksAdapter.getInitialState(), todos: todosAdapter.getInitialState()}},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasksAction.fulfilled, (state, action) => {
      tasksAdapter.setMany(state.domainData.tasks, action.payload.entities.tasks)
      todosAdapter.setMany(state.domainData.todos, action.payload.entities.todos)
    })
  }
})

export default taskSlice
