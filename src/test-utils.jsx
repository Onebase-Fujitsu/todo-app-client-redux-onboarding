import {render as rtlRender} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import taskSlice from './slices/taskSlice'
import {BrowserRouter, Switch} from 'react-router-dom'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {tasks: taskSlice.reducer},
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    return (
      <Provider store={store}>
        <BrowserRouter><Switch>{children}</Switch></BrowserRouter>
      </Provider>
    )
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react'
export {render}
