import {cleanup, render, screen} from '@testing-library/react'
import HeaderComponent from '../../components/HeaderComponent'

describe('HeaderComponent Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('Headerの初期表示', () => {
    render(<HeaderComponent />)
    expect(screen.getByText('Todo App')).toBeTruthy()
  })
})
