import React, { Component } from 'react'
import { BrowserRouter , Route } from 'react-router-dom'
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
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Dashboard}/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  )
})