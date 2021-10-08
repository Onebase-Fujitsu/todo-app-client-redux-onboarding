import {cleanup, screen} from '@testing-library/react'
import IndexPage from '../../pages/IndexPage'
import {render} from '../../test-utils'

describe('Index Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('Indexの画面構成', () => {
    render(<IndexPage />)
    expect(screen.getByTestId('HeaderComponent')).toBeTruthy()
    expect(screen.getByTestId('TodoListComponent')).toBeTruthy()
  })
})
