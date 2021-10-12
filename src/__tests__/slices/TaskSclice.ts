import taskSlice, {getTasksAction} from '../../slices/taskSlice'

describe('todo reducer', () => {
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
})
