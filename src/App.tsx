import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import IndexPage from './pages/IndexPage'
import {getTodosAction} from './slices/todoSlice'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodosAction())
  }, [])

  return (
    <div className="App">
      <IndexPage />
    </div>
  )
}

export default App
