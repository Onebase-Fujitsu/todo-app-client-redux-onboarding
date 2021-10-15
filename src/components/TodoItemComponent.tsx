import {EntityId} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {RootState} from "../stores/store";
import {patchTodoAction} from "../slices/taskSlice";

interface Props {
  taskId: EntityId
  todoId: EntityId
}

const TodoItemComponent = (props: Props) => {
  const {taskId, todoId} = props
  const todo = useSelector((state:RootState) => state.todos.entities[props.todoId])

  const dispatch = useDispatch()
  const [isTitleEdit, setIsTitleEdit] = useState(false)
  const [inputTodoTitle, setInputTodoTitle] = useState(todo?.title)

  const onBlurTodoTitle = async (todoTitle: string) => {
    await dispatch(patchTodoAction({taskId, todoId, title: todoTitle}))
    setIsTitleEdit(false)
  }

  return (
    <div>
      <li key={todo?.id}>
        <div className="text-gray-400">
          <input
            type="checkbox"
            checked={todo?.finished}
            onChange={() =>
              dispatch(
                patchTodoAction({
                  taskId: props.taskId,
                  todoId: props.todoId,
                  finished: !todo?.finished,
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
