import {useSelector} from 'react-redux'
import {RootState} from '../stores/store'
import TaskItemComponent from './TaskItemComponent.'

const TaskListComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasks)

  return (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
      {tasks.map((task) => (
        <TaskItemComponent taskId={task.id} />
      ))}
    </ul>
  )
}

export default TaskListComponent
