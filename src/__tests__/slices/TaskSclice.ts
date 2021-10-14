import taskSlice, {
  getTasksAction,
  patchTodoAction,
  postTaskAction,
} from '../../slices/taskSlice'

describe('task reducer', () => {
  it('initial state', () => {
    expect(taskSlice.reducer(undefined, {type: undefined})).toEqual([])
  })

  describe('get tasks', () => {
    it('get tasks is pending', () => {
      const action = {type: getTasksAction.pending.type}
      const state = taskSlice.reducer([], action)
      expect(state).toEqual([])
    })

    it('get tasks is fulfilled', () => {
      const action = {
        type: getTasksAction.fulfilled.type,
        payload: [
          {
            id: 1,
            title: 'title#1',
            todos: [],
            createdAt: "2021-10-13T01:08:14.984Z",
            updatedAt: "2021-10-13T03:19:01.281Z",
          },
        ],
      }
      const state = taskSlice.reducer([], action)
      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
      expect(state[0].createdAt).toEqual("2021-10-13T01:08:14.984Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })

    it('get tasks is pending', () => {
      const action = {type: getTasksAction.rejected.type}
      const state = taskSlice.reducer([], action)
      expect(state).toEqual([])
    })
  })

  describe('post task', () => {
    it('post task is fulfilled', () => {
      const action = {
        type: postTaskAction.fulfilled.type,
        payload: {
          id: 1,
          title: 'title#1',
          todos: [],
          createdAt: "2021-10-13T03:19:01.281Z",
          updatedAt: "2021-10-13T03:19:01.281Z"
        },
      }
      const state = taskSlice.reducer([], action)
      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
      expect(state[0].createdAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })

    it('post task is fulfilled 2', () => {
      const action = {
        type: postTaskAction.fulfilled.type,
        payload: {
          id: 2,
          title: 'title#2',
          todos: [
            {
              id: 1,
              title: 'todo#1',
              finished: false,
              createdAt: "2021-10-13T03:19:01.281Z",
              updatedAt: "2021-10-13T03:19:01.281Z",
            },
          ],
          createdAt: "2021-10-13T03:19:01.281Z",
          updatedAt: "2021-10-13T03:19:01.281Z"
        },
      }
      const state = taskSlice.reducer(
        [{id: 1, title: 'title#1', todos: [], createdAt: "2021-10-13T01:08:14.984Z", updatedAt: "2021-10-13T01:08:14.984Z"}],
        action
      )
      expect(state.length).toEqual(2)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
      expect(state[0].createdAt).toEqual("2021-10-13T01:08:14.984Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T01:08:14.984Z")
      expect(state[1].id).toEqual(2)
      expect(state[1].title).toEqual('title#2')
      expect(state[1].todos.length).toEqual(1)
      expect(state[1].todos[0].id).toEqual(1)
      expect(state[1].todos[0].title).toEqual('todo#1')
      expect(state[1].todos[0].finished).toEqual(false)
      expect(state[1].todos[0].createdAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[1].todos[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[1].createdAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[1].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })
  })

  describe('patch todo', () => {
    it('タイトルの更新', () => {
      const action = {
        type: patchTodoAction.fulfilled.type,
        payload: {
          id: 1,
          title: 'todo#1 updated',
          finished: false,
          createdAt: "2021-10-12T03:19:01.281Z",
          updatedAt: "2021-10-13T03:19:01.281Z"
        },
      }

      const state = taskSlice.reducer(
        [
          {
            id: 1,
            title: 'title#1',
            todos: [{
              id: 1,
              title: 'todo#1',
              finished: false,
              createdAt: "2021-10-12T03:19:01.281Z",
              updatedAt: "2021-10-12T03:19:01.281Z"}],
            createdAt: "2021-10-12T03:19:01.281Z",
            updatedAt: "2021-10-12T03:19:01.281Z",
          },
        ],
        action
      )

      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(1)
      expect(state[0].todos[0].id).toEqual(1)
      expect(state[0].todos[0].title).toEqual('todo#1 updated')
      expect(state[0].todos[0].finished).toEqual(false)
      expect(state[0].todos[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].todos[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })

    it('完了にする', () => {
      const action = {
        type: patchTodoAction.fulfilled.type,
        payload: {
          id: 1,
          title: 'todo#1',
          finished: true,
          createdAt: "2021-10-12T03:19:01.281Z",
          updatedAt: "2021-10-13T03:19:01.281Z",
        },
      }

      const state = taskSlice.reducer(
        [
          {
            id: 1,
            title: 'title#1',
            todos: [{
              id: 1,
              title: 'todo#1',
              finished: false,
              createdAt: "2021-10-12T03:19:01.281Z",
              updatedAt: "2021-10-12T03:19:01.281Z",
            }],
            createdAt: "2021-10-12T03:19:01.281Z",
            updatedAt: "2021-10-12T03:19:01.281Z",
          },
        ],
        action
      )

      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(1)
      expect(state[0].todos[0].id).toEqual(1)
      expect(state[0].todos[0].title).toEqual('todo#1')
      expect(state[0].todos[0].finished).toEqual(true)
      expect(state[0].todos[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].todos[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })

    it('タイトルの更新と完了状態にする', () => {
      const action = {
        type: patchTodoAction.fulfilled.type,
        payload: {
          id: 1,
          title: 'todo#1 updated',
          finished: true,
          createdAt: "2021-10-12T03:19:01.281Z",
          updatedAt: "2021-10-13T03:19:01.281Z",
        },
      }

      const state = taskSlice.reducer(
        [
          {
            id: 1,
            title: 'title#1',
            todos: [{
              id: 1,
              title: 'todo#1',
              finished: false,
              createdAt: "2021-10-12T03:19:01.281Z",
              updatedAt: "2021-10-12T03:19:01.281Z",
            }],
            createdAt: "2021-10-12T03:19:01.281Z",
            updatedAt: "2021-10-12T03:19:01.281Z",
          },
        ],
        action
      )

      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(1)
      expect(state[0].todos[0].id).toEqual(1)
      expect(state[0].todos[0].title).toEqual('todo#1 updated')
      expect(state[0].todos[0].finished).toEqual(true)
      expect(state[0].todos[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].todos[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
      expect(state[0].createdAt).toEqual("2021-10-12T03:19:01.281Z")
      expect(state[0].updatedAt).toEqual("2021-10-13T03:19:01.281Z")
    })
  })
})
