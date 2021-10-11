import {cleanup, screen} from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import userEvent from '@testing-library/user-event'
import NewTodoComponent from '../../components/NewTodoComponent'
import {render} from '../../test-utils'

describe('NewTodoComponent', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
    cleanup()
  })

  it('NewTodoの初期表示', () => {
    render(<NewTodoComponent />)
    expect(screen.getByText('Title')).toBeTruthy()
    expect(screen.getByRole('textbox')).toBeTruthy()
    expect(screen.getByRole('button')).toHaveTextContent('Create')
  })

  it('タイトルを入力した後作成ボタンをクリックするとテキストボックスが空欄に戻る', () => {
    const responseBody = {
      id: 1,
      title: 'title#1',
      finished: false,
    }
    mock.onPost('/todos').reply(201, responseBody)
    render(<NewTodoComponent />)
    userEvent.type(screen.getByRole('textbox'), 'title#1')
    userEvent.click(screen.getByRole('button'))
    expect(mock.history.post[0].url).toEqual('/todos')
    const request = {
      title: 'title#1',
    }
    expect(mock.history.post[0].data).toEqual(JSON.stringify(request))
    expect(screen.getByRole('textbox')).toHaveTextContent('')
  })
})
