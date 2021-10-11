import todoSlice, {getTodosAction, postTodoAction} from '../../slices/todoSlice'

describe('todo reducer', () => {
  it('initial state', () => {
    expect(todoSlice.reducer(undefined, {type: undefined})).toEqual([])
  })

  describe('get todos', () => {
    it('get todos is pending', () => {
      const action = {type: getTodosAction.pending.type}
      const state = todoSlice.reducer([], action)
      expect(state).toEqual([])
    })

    it('get todos is fulfilled', () => {
      const action = {
        type: getTodosAction.fulfilled.type,
        payload: [
          {
            id: 1,
            title: 'title#1',
            finished: false,
          },
        ],
      }
      const state = todoSlice.reducer([], action)
      expect(state.length).toEqual(1)
      expect(state[0].id).toEqual(1)
      expect(state[0].title).toEqual('title#1')
      expect(state[0].finished).toEqual(false)
    })

    it('get todos is pending', () => {
      const action = {type: getTodosAction.rejected.type}
      const state = todoSlice.reducer([], action)
      expect(state).toEqual([])
    })
  })

  describe('post todos', () => {
    it('post todos is fulfilled', () => {
      const action = {
        type: postTodoAction.fulfilled.type,
        payload: {
          id: 2,
          title: 'title#2',
          finished: false,
        },
      }
      const state = todoSlice.reducer(
        [
          {
            id: 1,
            title: 'title#1',
            finished: false,
          },
        ],
        action
      )
      expect(state.length).toEqual(2)
      expect(state[1].id).toEqual(2)
    })
  })
})
