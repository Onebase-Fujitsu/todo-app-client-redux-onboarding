import {cleanup, screen} from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import userEvent from '@testing-library/user-event'
import NewTaskComponent from '../../components/NewTaskComponent'
import {render} from '../../test-utils'

describe('NewTaskComponent', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
    cleanup()
  })

  it('NewTaskの初期表示', () => {
    render(<NewTaskComponent />)
    expect(screen.getByText('Title')).toBeTruthy()
    expect(screen.getByRole('textbox', {name: 'taskTitleInput'})).toBeTruthy()
    expect(screen.getByText('Todo')).toBeTruthy()
    expect(screen.queryByRole('textbox', {name: 'todoTitleInput'})).toBeNull()
    expect(screen.getByRole('button', {name: 'todoAddButton'})).toBeTruthy()
    expect(screen.getByRole('button', {name: 'createButton'})).toBeTruthy()
  })

  it('Todo追加ボタンをクリックするとTodo名入力欄が表示される', () => {
    render(<NewTaskComponent />)
    userEvent.click(screen.getByRole('button', {name: 'todoAddButton'}))
    expect(screen.getByRole('textbox', {name: 'todoTitleInput'})).toBeTruthy()
  })

  it('タイトルを入力した後作成ボタンをクリックするとテキストボックスが空欄に戻る', () => {
    const responseBody = {
      id: 1,
      title: 'title#1',
      finished: false,
    }
    mock.onPost('/todos').reply(201, responseBody)
    render(<NewTaskComponent />)
    userEvent.type(screen.getByRole('textbox'), 'title#1')
    userEvent.click(screen.getByRole('button', {name: 'createButton'}))
    expect(mock.history.post[0].url).toEqual('/tasks')
    const request = {
      title: 'title#1',
      todos: [],
    }
    expect(mock.history.post[0].data).toEqual(JSON.stringify(request))
    expect(screen.getByRole('textbox')).toHaveTextContent('')
  })
})
