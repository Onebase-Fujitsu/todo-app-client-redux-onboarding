import {cleanup, screen} from '@testing-library/react'
import {render} from '../../test-utils'
import NewTaskPage from '../../pages/NewTaskPage'

describe('New Task Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('New Todoの画面構成', () => {
    render(<NewTaskPage />)
    expect(screen.getByTestId('HeaderComponent')).toBeTruthy()
    expect(screen.getByTestId('NewTaskComponent')).toBeTruthy()
  })
})
