import {cleanup, screen} from '@testing-library/react'
import {render} from '../../test-utils'
import NewTodoPage from '../../pages/NewTodoPage'

describe('New Todo Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('New Todoの画面構成', () => {
    render(<NewTodoPage />)
    expect(screen.getByTestId('HeaderComponent')).toBeTruthy()
    expect(screen.getByTestId('NewTodoComponent')).toBeTruthy()
  })
})
