import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {postTaskAction} from '../slices/taskSlice'

const NewTaskComponent = () => {
  const [taskTitleInputValue, setTaskTitleInputValue] = useState('')
  const [todos, setTodos] = useState<string[]>([])
  const dispatch = useDispatch()

  const onclickCreateButton = async () => {
    dispatch(postTaskAction({title: taskTitleInputValue, todos}))
    setTaskTitleInputValue('')
  }

  return (
    <div data-testid="NewTaskComponent" className="m-3">
      <label
        htmlFor="titleInput"
        aria-label="taskTitleInput"
        className="text-md font-normal leading-normal mt-0 mb-2"
      >Title</label>
      <input
        id="titleInput"
        type="text"
        value={taskTitleInputValue}
        onChange={(event) => setTaskTitleInputValue(event.target.value)}
        placeholder="タイトル"
        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full mb-2"
      />
      <label>Todo</label>
      {
        todos.map((todo, index) =>
          // eslint-disable-next-line react/no-array-index-key
          <input key={index} type="text" aria-label="todoTitleInput" defaultValue={todo}/>
        )
      }
      <button
        type="button"
        aria-label="todoAddButton"
        onClick={() => setTodos([...todos, ""])}
      >
        <FontAwesomeIcon icon={faPlusCircle}/>
      </button>
      <button
        type="button"
        aria-label="createButton"
        onClick={onclickCreateButton}
        className="bg-yellow-400 active:bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        Create
      </button>
    </div>
  )
}

export default NewTaskComponent
