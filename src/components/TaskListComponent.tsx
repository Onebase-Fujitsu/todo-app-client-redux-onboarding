import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../stores/store'
import {patchTodoAction} from '../slices/taskSlice'

const TaskListComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasks)
  const dispatch = useDispatch()

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
          <div className="text-xl">{task.title}</div>
          <ul>
            {task.todos.map((todo) => (
              <li key={todo.id}>
                <div className="text-gray-400">
                  <input
                    type="checkbox"
                    checked={todo.finished}
                    onChange={() =>
                      dispatch(
                        patchTodoAction({
                          taskId: task.id,
                          todoId: todo.id,
                          finished: !todo.finished,
                        })
                      )
                    }
                  />
                  {todo.title}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default TaskListComponent
