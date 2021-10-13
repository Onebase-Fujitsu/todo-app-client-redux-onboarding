import axios, {AxiosResponse} from 'axios'
import {Task, Todo} from '../slices/taskSlice'

interface todoPatchRequest {
  title?: string
  finished?: boolean
}

export const postTask = async (title: string, todos: string[]) => {
  const requestBody = JSON.stringify({title, todos})
  const headers = {
    'Content-Type': 'application/json',
  }
  const response: AxiosResponse<Task> = await axios.post(
    '/tasks',
    requestBody,
    {headers}
  )
  return response.data
}

export const getTasks = async () => {
  const response = await axios.get<Task[]>('/tasks')
  return response.data
}

export const patchTodo = async (
  taskId: number,
  todoId: number,
  title?: string,
  finished?: boolean
) => {
  const json: todoPatchRequest = {}
  if (title !== undefined) {
    json.title = title
  }
  if (finished !== undefined) {
    json.finished = finished
  }
  const requestBody = JSON.stringify(json)
  const headers = {
    'Content-Type': 'application/json',
  }
  const response: AxiosResponse<Todo> = await axios.patch(
    `/tasks/${taskId}/todos/${todoId}`,
    requestBody,
    {headers}
  )
  return response.data
}
