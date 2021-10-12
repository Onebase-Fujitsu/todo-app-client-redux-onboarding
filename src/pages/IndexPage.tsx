import HeaderComponent from '../components/HeaderComponent'
import TaskListComponent from '../components/TaskListComponent'

const IndexPage = () => (
  <div className="flex flex-row items-start">
    <HeaderComponent />
    <TaskListComponent />
  </div>
)

export default IndexPage
