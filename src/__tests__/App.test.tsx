import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import App from '../App'
import {render} from '../test-utils'

describe('App', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  it('アプリケーション初期表示時に状態を全件取得する', () => {
    mock.onGet('/tasks').reply(200, [
      {
        id: 1,
        title: 'title#1',
        todos: [],
      },
    ])

    render(<App />)

    expect(mock.history.get[0].url).toEqual('/tasks')
  })
})
