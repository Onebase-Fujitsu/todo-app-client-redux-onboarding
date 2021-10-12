import taskSlice, {getTasksAction, postTaskAction} from '../../slices/taskSlice'

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
            todos: []
          },
        ],
      }
      const state = taskSlice.reducer([], action)
      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
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
          todos: []
        }
      }
      const state = taskSlice.reducer([], action)
      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
    })

    it('post task is fulfilled 2', () => {
      const action = {
        type: postTaskAction.fulfilled.type,
        payload: {
          id: 2,
          title: 'title#2',
          todos: [{
            id: 1,
            title: 'todo#1',
            finished: false
          }]
        }
      }
      const state = taskSlice.reducer([
        {id: 1, title: 'title#1', todos: []}
      ], action)
      expect(state.length).toEqual(2)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].todos.length).toEqual(0)
      expect(state[1].id).toEqual(2)
      expect(state[1].title).toEqual('title#2')
      expect(state[1].todos.length).toEqual(1)
      expect(state[1].todos[0].id).toEqual(1)
      expect(state[1].todos[0].title).toEqual('todo#1')
      expect(state[1].todos[0].finished).toEqual(false)
    })
  })
})
