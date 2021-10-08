import axios from 'axios'
import {Todo} from '../slices/todoSlice'

export const getTodos = async () => {
  const response = await axios.get<Todo[]>('/todos')
  return response.data
}
