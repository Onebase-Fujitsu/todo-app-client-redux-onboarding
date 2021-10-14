import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {patchTaskAction, patchTodoAction} from "../slices/taskSlice";
import {RootState} from "../stores/store";

interface Props {
  taskId: number
}

const TaskItemComponent = (props: Props) => {
  const task = useSelector((state: RootState) => state.tasks.find((temp) => temp.id === props.taskId))
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
    <li
      className="bg-yellow-200 px-5 py-3 m-3 shadow-md rounded-md"
      key={task?.id}
    >
      {!isTitleEdit && <button type="button" onClick={() => setIsTitleEdit(true)}><div>{task?.title}</div></button>}
      {isTitleEdit && <input
        className="text-xl"
        type="textbox"
        value={inputTaskTitle}
        onChange={(event) => onChangeTaskTitle(event.target.value)}
        onBlur={(event) => onBlurTaskTitle(event.target.value)}
      />}
      <div className="text-sm">作成日:{dayjs(task?.createdAt).format('YYYY年MM月DD日HH時mm分ss秒')}</div>
      <div className="text-sm">更新日:{dayjs(task?.updatedAt).format('YYYY年MM月DD日HH時mm分ss秒')}</div>
      <ul>
        {task?.todos.map((todo) => (
          <li key={todo.id}>
            <div className="text-gray-400">
              <input
                type="checkbox"
                checked={todo.finished}
                onChange={() =>
                  dispatch(
                    patchTodoAction({
                      taskId: task.id,
                      todoId: todo.id,
                      finished: !todo.finished,
                    })
                  )
                }
              />
              {todo.title}
            </div>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default TaskItemComponent