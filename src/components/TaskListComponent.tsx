import {useSelector} from 'react-redux'
import {RootState} from '../stores/store'

const TaskListComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasks)
  return (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
      {tasks.map((task) => (
        <li
          className="bg-yellow-200 px-5 py-3 m-3 shadow-md rounded-md"
          key={task.id}
        >
          {task.title}
          <ul>
            {
              task.todos.map((todo) =>
                <li key={todo.id}>
                  <input type="checkbox" defaultChecked={todo.finished}/>
                  {todo.title}
                </li>
              )
            }
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default TaskListComponent
