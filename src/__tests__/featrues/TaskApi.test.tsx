import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {getTasks, postTask} from '../../features/TaskApi'

describe('Task API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  describe("Get /tasks", () => {
    it("タスクを全件取得する", async () => {
      mock.onGet('/tasks').reply(200, [
        {
          id: 1,
          title: 'title#1',
          todos: []
        },
      ])

      const response = await getTasks()
      expect(mock.history.get[0].url).toEqual('/tasks')
      expect(response[0].id).toEqual(1)
      expect(response[0].title).toEqual('title#1')
      expect(response[0].todos.length).toEqual(0)
    })
  })

  describe('POST /tasks', () => {
    it('todoが0件のタスクを追加する', async () => {
      mock.onPost('/tasks').reply(201, {
        id: 1,
        title: 'title#1',
        todos: []
      })

      const response = await postTask('title#1')

      expect(mock.history.post[0].url).toEqual('/tasks')
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('title#1')
      expect(response.todos.length).toEqual(0)
    })
  })
})
