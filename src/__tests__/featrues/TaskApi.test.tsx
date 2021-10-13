import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {getTasks, patchTodo, postTask} from '../../features/TaskApi'

describe('Task API', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  describe('Get /tasks', () => {
    it('タスクを全件取得する', async () => {
      mock.onGet('/tasks').reply(200, [
        {
          id: 1,
          title: 'title#1',
          todos: [],
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
        todos: [],
      })

      const response = await postTask('title#1', [])

      expect(mock.history.post[0].url).toEqual('/tasks')
      expect(mock.history.post[0].data).toEqual(
        JSON.stringify({title: 'title#1', todos: []})
      )
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('title#1')
      expect(response.todos.length).toEqual(0)
    })

    it('todoを設定してタスクを追加する', async () => {
      mock.onPost('/tasks').reply(201, {
        id: 1,
        title: 'title#1',
        todos: [
          {
            id: 1,
            title: 'todo#1',
            finished: false,
          },
        ],
      })

      const response = await postTask('title#1', ['todo#1'])
      expect(mock.history.post[0].url).toEqual('/tasks')
      expect(mock.history.post[0].data).toEqual(
        JSON.stringify({title: 'title#1', todos: ['todo#1']})
      )
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('title#1')
      expect(response.todos.length).toEqual(1)
      expect(response.todos[0].id).toEqual(1)
      expect(response.todos[0].title).toEqual('todo#1')
      expect(response.todos[0].finished).toEqual(false)
    })
  })

  describe('PATCH /tasks/{taskId}/todos/{todoId}', () => {
    it('todoを完了にする', async () => {
      mock.onPatch('/tasks/1/todos/1').reply(200, {
        id: 1,
        title: 'todo#1',
        finished: true,
      })

      const response = await patchTodo(1, 1, undefined, true)
      expect(mock.history.patch[0].url).toEqual('/tasks/1/todos/1')
      expect(mock.history.patch[0].data).toEqual(
        JSON.stringify({finished: true})
      )
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('todo#1')
      expect(response.finished).toEqual(true)
    })

    it('todoのタイトルを変更する', async () => {
      mock.onPatch('/tasks/1/todos/1').reply(200, {
        id: 1,
        title: 'todo#1 updated',
        finished: false,
      })

      const response = await patchTodo(1, 1, 'todo#1 updated', undefined)
      expect(mock.history.patch[0].url).toEqual('/tasks/1/todos/1')
      expect(mock.history.patch[0].data).toEqual(
        JSON.stringify({title: 'todo#1 updated'})
      )
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('todo#1 updated')
      expect(response.finished).toEqual(false)
    })

    it('todoのタイトルを変更し、完了にする', async () => {
      mock.onPatch('/tasks/1/todos/1').reply(200, {
        id: 1,
        title: 'todo#1 updated',
        finished: true,
      })

      const response = await patchTodo(1, 1, 'todo#1 updated', true)
      expect(mock.history.patch[0].url).toEqual('/tasks/1/todos/1')
      expect(mock.history.patch[0].data).toEqual(
        JSON.stringify({title: 'todo#1 updated', finished: true})
      )
      expect(response.id).toEqual(1)
      expect(response.title).toEqual('todo#1 updated')
      expect(response.finished).toEqual(true)
    })
  })
})
