import {render as rtlRender} from '@testing-library/react'
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import todoSlice from './slices/todoSlice'
import {BrowserRouter} from 'react-router-dom'

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {todos: todoSlice.reducer},
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    )
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react'
export {render}
