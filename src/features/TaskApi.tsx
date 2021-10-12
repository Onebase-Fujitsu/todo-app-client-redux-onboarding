import axios, {AxiosResponse} from 'axios'
import {Task} from '../slices/taskSlice'

export const postTask = async (title: string) => {
  const requestBody = JSON.stringify({title})
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