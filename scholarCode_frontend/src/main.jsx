import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {store, persistor } from './Redux/Store/Store.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>,
)
