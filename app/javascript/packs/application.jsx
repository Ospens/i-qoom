import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import mainStore from '../stores/mainStore'
import { ToastContainer } from 'react-toastify'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/App.scss'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <App />
      <ToastContainer />
    </Provider>,
    document.getElementById('app'),
  )
})