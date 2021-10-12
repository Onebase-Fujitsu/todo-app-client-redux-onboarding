import {screen} from '@testing-library/react'
import {render} from '../../test-utils'
import TaskListComponent from '../../components/TaskListComponent'

describe('TodoListComponent', () => {
  it('Stateが空だったらリストは表示されない', () => {
    render(<TaskListComponent />, {preloadedState: {tasks: []}})
    expect(screen.queryByRole('listitem')).toBeFalsy()
  })

  it('Stateにタスクのリストがあれば、タイトルを全件表示する', () => {
    const initialTasks = [
      {
        id: 1,
        title: 'title#1',
        todos: [],
      },
      {
        id: 2,
        title: 'title#2',
        todos: [],
      },
    ]
    render(<TaskListComponent />, {preloadedState: {tasks: initialTasks}})
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('title#1')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('title#2')
  })
})
