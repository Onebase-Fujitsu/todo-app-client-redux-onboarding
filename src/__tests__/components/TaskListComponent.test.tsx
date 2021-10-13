import {cleanup, screen} from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import flushPromises from 'flush-promises'
import TaskListComponent from '../../components/TaskListComponent'
import {render} from '../../test-utils'

describe('TaskListComponent', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
    cleanup()
  })

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
        todos: [
          {id: 1, title: 'todo#1', finished: true},
          {id: 2, title: 'todo#2', finished: false},
        ],
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

  it('todoを完了にする', async () => {
    mock.onPatch('/tasks/1/todos/2').reply(200, {
      id: 2,
      title: 'todo#2',
      finished: true,
    })
    const initialTasks = [
      {
        id: 1,
        title: 'title#1',
        todos: [{id: 2, title: 'todo#2', finished: false}],
      },
    ]
    render(<TaskListComponent />, {preloadedState: {tasks: initialTasks}})
    userEvent.click(screen.getByRole('checkbox'))

    await flushPromises()
    expect(mock.history.patch[0].url).toEqual('/tasks/1/todos/2')
    const request = {
      finished: true,
    }
    expect(mock.history.patch[0].data).toEqual(JSON.stringify(request))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
