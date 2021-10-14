import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {patchTodoAction, selectTodoById} from '../slices/taskSlice'
import {RootState} from '../stores/store'

interface Props {
  taskId: number
  todoId: number
}

const TodoItemComponent = (props: Props) => {
  const {taskId, todoId} = props

  const tasks = useSelector((state: RootState) => state.tasks)
  const todo = selectTodoById(tasks, taskId, todoId)
  const dispatch = useDispatch()
  const [isTitleEdit, setIsTitleEdit] = useState(false)
  const [inputTodoTitle, setInputTodoTitle] = useState(todo.title)

  const onBlurTodoTitle = async (todoTitle: string) => {
    await dispatch(patchTodoAction({taskId, todoId, title: todoTitle}))
    setIsTitleEdit(false)
  }

  return (
    <div>
      <li key={todo.id}>
        <div className="text-gray-400">
          <input
            type="checkbox"
            checked={todo.finished}
            onChange={() =>
              dispatch(
                patchTodoAction({
                  taskId: props.taskId,
                  todoId: todo.id,
                  finished: !todo.finished,
                })
              )
            }
          />
          {!isTitleEdit && (
            <button type="button" onClick={() => setIsTitleEdit(true)}>
              <div>{inputTodoTitle}</div>
            </button>
          )}
          {isTitleEdit && (
            <input
              type="textbox"
              value={inputTodoTitle}
              onChange={(event) => setInputTodoTitle(event.target.value)}
              onBlur={(event) => onBlurTodoTitle(event.target.value)}
            />
          )}
        </div>
      </li>
    </div>
  )
}

export default TodoItemComponent
