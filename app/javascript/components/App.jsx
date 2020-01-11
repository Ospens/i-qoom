import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { Route, Switch, useLocation } from 'react-router-dom'
import PrivateRoute from '../elements/PrivateRoute'
import LandingPage from './landing/LandingPage'
import Dashboard from './dashboard/Dashboard'
import TopBar from './topBar/TopBar'
import SideBar from './sideBar/SideBar'
import LandingMenu from './landing/LandingMenu'
import Notifications from './notifications/Notifications'

function App() {
  const { pathname } = useLocation()
  const authed = useSelector(({ user }) => user.authStatus)
  const openSB = useSelector(({ projects }) => projects.sidebar)

  const mainClass = classnames(
    { dashboard: pathname.includes('/dashboard') },
    { 'sidebar-off': !openSB }
  )

  return (
    <div id="wrapper">
      <PrivateRoute
        authed={authed}
        // The order is matter!
        path={['/dashboard/projects/:projectId', '/dashboard']}
        component={SideBar}
      />
      <div id="main" className={mainClass}>
        <header id="header">
          <div className="wrap">
            <TopBar />
          </div>
        </header>
        <Switch>
          <PrivateRoute path="/menu" authed={authed} component={LandingMenu} />
          <PrivateRoute authed={authed} path="/dashboard" component={Dashboard} title="Dashboard" />
          <Route path="/" render={props => <LandingPage {...props} authed={authed} />} />
        </Switch>
      </div>
      <Notifications />
    </div>
  )
}

export default App
