import {screen} from '@testing-library/react'
import {render} from '../../test-utils'
import TaskListComponent from '../../components/TaskListComponent'

describe('TaskListComponent', () => {
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
        todos: [{id: 1, title: "todo#1", finished: true},{id: 2, title: "todo#2", finished: false}]
      },
    ]
    render(<TaskListComponent />, {preloadedState: {tasks: initialTasks}})
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('title#1')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('title#2')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('todo#1')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('todo#2')
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
    expect(screen.getAllByRole('checkbox')[1]).not.toBeChecked()
  })
})
