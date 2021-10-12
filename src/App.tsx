import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import {getTasksAction} from './slices/taskSlice'
import NotFoundPage from './pages/NotFoundPage'
import NewTodoPage from './pages/NewTodoPage'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTasksAction())
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
