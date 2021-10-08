import HeaderComponent from '../components/HeaderComponent'
import TodoListComponent from '../components/TodoListComponent'

const IndexPage = () => (
  <div className="flex flex-row items-start">
    <HeaderComponent />
    <TodoListComponent />
  </div>
)

export default IndexPage
