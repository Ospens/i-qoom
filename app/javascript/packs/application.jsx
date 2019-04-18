import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import mainStore from '../stores/mainStore'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/App.scss'
import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <App />
    </Provider>,
    document.getElementById('app'),
  )
})