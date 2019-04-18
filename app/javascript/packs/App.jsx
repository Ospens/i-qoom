import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import mainStore from '../stores/mainStore'
import LandingPage from '../components/landing/LandingPage'
import Dashboard from '../components/dashboard/Dashboard'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/App.scss'
import 'react-toastify/dist/ReactToastify.css'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <BrowserRouter>
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/' component={LandingPage} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </Provider>,
    document.getElementById('app'),
  )
})