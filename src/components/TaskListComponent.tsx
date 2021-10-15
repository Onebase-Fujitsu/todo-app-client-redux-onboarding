// import {useSelector} from 'react-redux'
// import TaskItemComponent from './TaskItemComponent.'

const TaskListComponent = () => 
  // const tasks = useSelector(taskSelectors.selectAll)
   (
    <ul
      className="flex grid grid-cols-3 flex-grow"
      data-testid="TaskListComponent"
    >
       {/* {tasks.map((task) => ( */}
       {/* <TaskItemComponent taskId={task.id}/> */}
       {/* ))} */}
    </ul>
  )


export default TaskListComponent
