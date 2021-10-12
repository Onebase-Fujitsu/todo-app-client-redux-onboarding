import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faList} from '@fortawesome/free-solid-svg-icons'

const HeaderComponent = () => (
  <div
    data-testid="HeaderComponent"
    className="w-48 h-screen border-r bg-yellow-400 flex flex-col text-white"
  >
    <h1 className="text-center py-2 font-bold border-dashed text-2xl">
      Todo App
    </h1>
    <Link to="/" className="p-3">
      <FontAwesomeIcon className="mr-2" icon={faList} />
      Todo List
    </Link>
    <Link to="/newTask" className="p-3">
      <FontAwesomeIcon className="mr-2" icon={faEdit} />
      New Task
    </Link>
  </div>
)

export default HeaderComponent
