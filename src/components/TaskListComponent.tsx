import {useSelector} from 'react-redux'
import TaskItemComponent from './TaskItemComponent.'
import {taskSelectors} from "../slices/taskSlice";

const TaskListComponent = () => {
  const tasks = useSelector(taskSelectors.selectAll)
  return (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
       {tasks.map((task) => (
        <TaskItemComponent taskId={task.id}/>
       ))}
    </ul>
  )
}

export default TaskListComponent
