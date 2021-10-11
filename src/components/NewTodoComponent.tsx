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
    <div data-testid="NewTodoComponent">
      <label htmlFor="titleInput">Title</label>
      <input
        id="titleInput"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button type="button" onClick={onclickCreateButton}>
        Create
      </button>
    </div>
  )
}

export default NewTodoComponent
