import axios, {AxiosResponse} from 'axios'
import {Todo} from '../slices/todoSlice'

export const getTodos = async () => {
  const response = await axios.get<Todo[]>('/todos')
  return response.data
}

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
