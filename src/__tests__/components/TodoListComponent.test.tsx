import {screen} from '@testing-library/react'
import {render} from '../../test-utils'
import TodoListComponent from '../../components/TodoListComponent'

describe('TodoListComponent', () => {
  it('Stateが空だったらリストは表示されない', () => {
    render(<TodoListComponent />, {preloadedState: {todos: []}})
    expect(screen.queryByRole('listitem')).toBeFalsy()
  })

  it('Stateにタスクのリストがあれば、タイトルを全件表示する', () => {
    const initialTodos = [
      {
        id: 1,
        title: 'title#1',
        finished: false,
      },
      {
        id: 2,
        title: 'title#2',
        finished: false,
      },
    ]
    render(<TodoListComponent />, {preloadedState: {todos: initialTodos}})
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent('title#1')
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent('title#2')
  })
})
