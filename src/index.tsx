import {StrictMode} from "react"
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import App from './App'
import {store} from './stores/store'
import './index.css'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
