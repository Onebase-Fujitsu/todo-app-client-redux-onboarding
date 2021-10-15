import {useSelector} from 'react-redux'
import TaskItemComponent from './TaskItemComponent'
import {RootState} from "../stores/store";

const TaskListComponent = () => {
  const taskIds = useSelector((state: RootState) => state.tasks.ids)
  return (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
      {taskIds.map((id) => (
        <TaskItemComponent taskId={id}/>
      ))}
    </ul>
  )
}

export default TaskListComponent
