import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import mainStore from '../stores/mainStore'
import LandingPage from '../components/landing/LandingPage'
import Dashboard from '../components/dashboard/Dashboard'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../styles/App.scss'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={mainStore} >
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  )
})