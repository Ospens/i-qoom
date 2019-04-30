import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../elements/PrivateRoute'
import LandingPage from '../components/landing/LandingPage'
import Dashboard from '../components/dashboard/Dashboard'
import AdminPanel from '../components/adminPanel/AdminPanel'
import '../styles/semantic.css'

const App = ({ authed }) => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute authed={authed} path='/dashboard' component={Dashboard}/>
      <PrivateRoute authed={authed} path='/admin_panel' component={AdminPanel} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </BrowserRouter>
)

const mapStateToProps = ({auth}) => ({
  authed: auth.authStatus
})

export default connect(mapStateToProps)(App)
