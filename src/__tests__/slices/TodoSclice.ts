import todoSlice, {getTodosAction} from '../../slices/todoSlice'

describe('todo reducer', () => {
  it('initial state', () => {
    expect(todoSlice.reducer(undefined, {type: undefined})).toEqual([])
  })

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
