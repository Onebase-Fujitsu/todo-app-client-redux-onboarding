import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {getTodos} from '../../features/TodoApi'

describe('Todo API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  describe('GET /todos', () => {
    it('タスクを全件取得する', async () => {
      mock.onGet('/todos').reply(200, [
        {
          id: 1,
          title: 'title#1',
          finished: false,
        },
      ])

      const response = await getTodos()

      expect(mock.history.get[0].url).toEqual('/todos')
      expect(response[0].id).toEqual(1)
      expect(response[0].title).toEqual('title#1')
      expect(response[0].finished).toEqual(false)
    })
  })
})
