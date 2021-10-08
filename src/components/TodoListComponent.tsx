import {useSelector} from 'react-redux'
import {RootState} from '../stores/store'

const TodoListComponent = () => {
  const todos = useSelector((state: RootState) => state.todos)
  return (
    <ul className="flex grid grid-cols-3 flex-grow" data-testid="TodoListComponent">
      {todos.map((todo) => (
        <li className="bg-yellow-200 px-5 py-3 m-3 shadow-md rounded-md" key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default TodoListComponent
