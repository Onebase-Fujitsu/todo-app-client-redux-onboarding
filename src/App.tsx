import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import {getTasksAction} from './slices/taskSlice'
import NotFoundPage from './pages/NotFoundPage'
import NewTaskPage from './pages/NewTaskPage'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTasksAction())
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage}/>
          <Route exact path="/newTask" component={NewTaskPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
