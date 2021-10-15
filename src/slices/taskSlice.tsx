import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from '@reduxjs/toolkit'
// import {schema} from "normalizr";
import {getTasks, patchTask, patchTodo, postTask} from '../features/TaskApi'
import {RootState} from "../stores/store";

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

const tasksAdapter = createEntityAdapter<TaskEntity>({})
const todosAdapter = createEntityAdapter<Todo>({})

export const taskSelectors = tasksAdapter.getSelectors(
  (state: RootState) => state.tasks
);

export const getTasksAction = createAsyncThunk<Task[]>(
  'get /tasks',
  async (): Promise<Task[]> => getTasks()
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
      action.payload.map((task) => {
        const todos = todosAdapter.getInitialState()
        const taskEntry: TaskEntity = {
          id: task.id,
          title: task.title,
          todos: todosAdapter.addMany(todos, task.todos),
          createdAt: task.createdAt,
          updatedAt: task.updatedAt
        }
        tasksAdapter.addOne(state, taskEntry)
        return null
      })
    })
  }
})

export default taskSlice
