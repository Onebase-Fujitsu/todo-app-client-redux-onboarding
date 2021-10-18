import {useSelector} from 'react-redux'
import {RootState} from '../stores/store'
import TaskItemComponent from './TaskItemComponent.'

const TaskListComponent = () => {
  const taskIds = useSelector(
    (state: RootState) => state.tasks.domainData.tasks.ids
  )
  return (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
      {taskIds.map((id) => (
        <TaskItemComponent taskId={id} />
      ))}
    </ul>
  )
}

export default TaskListComponent
