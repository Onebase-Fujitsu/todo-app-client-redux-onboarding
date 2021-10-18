import {EntityId} from '@reduxjs/toolkit'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import dayjs from 'dayjs'
import {RootState} from '../stores/store'
import {patchTaskAction} from '../slices/taskSlice'
import TodoItemComponent from './TodoItemComponent'

interface Props {
  taskId: EntityId
}

const TaskItemComponent = (props: Props) => {
  const task = useSelector(
    (state: RootState) => state.tasks.domainData.tasks.entities[props.taskId]
  )
  const [isTitleEdit, setIsTitleEdit] = useState(false)
  const [inputTaskTitle, setInputTaskTitle] = useState(task?.title)
  const dispatch = useDispatch()

  const onChangeTaskTitle = async (taskTitle: string) => {
    setInputTaskTitle(taskTitle)
  }

  const onBlurTaskTitle = async (taskTitle: string) => {
    await dispatch(patchTaskAction({taskId: props.taskId, title: taskTitle}))
    setIsTitleEdit(false)
  }

  return (
    <div>
      <li
        className="bg-yellow-200 px-5 py-3 m-3 shadow-md rounded-md"
        key={task?.id}
      >
        {!isTitleEdit && (
          <button type="button" onClick={() => setIsTitleEdit(true)}>
            <div>{task?.title}</div>
          </button>
        )}
        {isTitleEdit && (
          <input
            className="text-xl"
            type="textbox"
            value={inputTaskTitle}
            onChange={(event) => onChangeTaskTitle(event.target.value)}
            onBlur={(event) => onBlurTaskTitle(event.target.value)}
          />
        )}
        <div className="text-sm">
          作成日:{dayjs(task?.createdAt).format('YYYY年MM月DD日HH時mm分ss秒')}
        </div>
        <div className="text-sm">
          更新日:{dayjs(task?.updatedAt).format('YYYY年MM月DD日HH時mm分ss秒')}
        </div>
        {task?.todos.map((todoId) => (
          <TodoItemComponent taskId={props.taskId} todoId={todoId} />
        ))}
      </li>
    </div>
  )
}

export default TaskItemComponent
