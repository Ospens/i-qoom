import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import mainStore from '../stores/mainStore'
import App from '../components/App'
import '../styles/semantic.css'
import '../styles/iconStyle.scss'
import '../styles/icons.scss'
import '../styles/App.scss'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  )
})