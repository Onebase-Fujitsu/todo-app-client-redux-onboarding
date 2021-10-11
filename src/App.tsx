import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import {getTodosAction} from './slices/todoSlice'
import NotFoundPage from './pages/NotFoundPage'
import NewTodoPage from './pages/NewTodoPage'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodosAction())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/newTodo" component={NewTodoPage} />
        <Route component={NotFoundPage} />
      </BrowserRouter>
    </div>
  )
}

export default App
