import {useSelector} from 'react-redux'
import {RootState} from '../stores/store'

const TodoListComponent = () => {
  const todos = useSelector((state: RootState) => state.todos)
  return (
    <ul data-testid="TodoListComponent">
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default TodoListComponent
