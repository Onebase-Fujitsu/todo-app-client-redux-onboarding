import axios, {AxiosResponse} from 'axios'
import {Task, Todo} from '../slices/taskSlice'

export const postTodo = async (title: string) => {
  const requestBody = JSON.stringify({title})
  const headers = {
    'Content-Type': 'application/json',
  }
  const response: AxiosResponse<Todo> = await axios.post(
    '/todos',
    requestBody,
    {headers}
  )
  return response.data
}

export const getTasks = async () => {
  const response = await axios.get<Task[]>('/tasks')
  return response.data
}