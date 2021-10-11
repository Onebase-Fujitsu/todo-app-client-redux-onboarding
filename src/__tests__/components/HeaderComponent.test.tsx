import {cleanup, screen} from '@testing-library/react'
import HeaderComponent from '../../components/HeaderComponent'
import {render} from '../../test-utils'

describe('HeaderComponent Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('Headerの初期表示', () => {
    render(<HeaderComponent />)
    expect(screen.getByText('Todo App')).toBeTruthy()
    expect(screen.getAllByRole('link')[0]).toHaveTextContent('Todo List')
    expect(screen.getAllByRole('link')[0]).toHaveProperty(
      'href',
      'http://localhost/'
    )
    expect(screen.getAllByRole('link')[1]).toHaveTextContent('New Todo')
    expect(screen.getAllByRole('link')[1]).toHaveProperty(
      'href',
      'http://localhost/newTodo'
    )
  })
})
