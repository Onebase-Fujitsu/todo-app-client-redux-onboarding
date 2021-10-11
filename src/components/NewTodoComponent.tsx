import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {postTodoAction} from '../slices/todoSlice'

const NewTodoComponent = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const onclickCreateButton = async () => {
    dispatch(postTodoAction({title: input}))
    setInput('')
  }

  return (
    <div data-testid="NewTodoComponent" className="m-3">
      <label
        htmlFor="titleInput"
        className="text-md font-normal leading-normal mt-0 mb-2"
      >Title</label>
      <input
        id="titleInput"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="タスクのタイトル"
        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full mb-2"
      />
      <button
        type="button"
        onClick={onclickCreateButton}
        className="bg-yellow-400 active:bg-yellow-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      >
        Create
      </button>
    </div>
  )
}

export default NewTodoComponent
