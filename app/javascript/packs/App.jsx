import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../elements/PrivateRoute'
import LandingPage from '../components/landing/LandingPage'
import Dashboard from '../components/dashboard/Dashboard'
import '../styles/semantic.css'

const App = ({ authed }) => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <PrivateRoute authed={authed} path='/dashboard' component={Dashboard} routeName='Dashboard' />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = ({auth}) => ({
  authed: auth.authStatus
})

export default connect(mapStateToProps)(App)
