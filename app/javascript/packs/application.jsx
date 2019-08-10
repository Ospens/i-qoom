import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import mainStore from '../stores/mainStore'
import { ToastContainer } from 'react-toastify'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/App.scss'
import 'react-toastify/dist/ReactToastify.css'
import App from '../components/App'
import '../styles/semantic.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/icons.scss'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <App />
      <ToastContainer />
    </Provider>,
    document.getElementById('app'),
  )
})