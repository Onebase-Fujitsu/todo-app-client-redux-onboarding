import {cleanup, screen} from '@testing-library/react'
import {render} from '../../test-utils'
import NotFoundPage from '../../pages/NotFoundPage'

describe('Index Page', () => {
  afterEach(() => {
    cleanup()
  })

  it('Indexの画面構成', () => {
    render(<NotFoundPage />)
    expect(screen.getByTestId('HeaderComponent')).toBeTruthy()
    expect(screen.getByText('Not Found')).toBeTruthy()
  })
})
