import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from '../elements/PrivateRoute'
import LandingPage from './landing/LandingPage'
import Dashboard from './dashboard/Dashboard'
import TopBar from './topBar/TopBar'
import SideBar from './sideBar/SideBar'
import LandingMenu from './landing/LandingMenu'
import Notifications from './notifications/Notifications'
import { toggleSidebar } from '../actions/projectActions'

const App = ({ location: { pathname } }) => {
  const dispatch = useDispatch()
  const authed = useSelector(({ user }) => user.authStatus)
  const openSB = useSelector(({ projects }) => projects.sidebar)
  const toggleSB = useCallback(() => dispatch(toggleSidebar(!openSB)), [dispatch, openSB])

  const mainClass = classnames(
    { dashboard: pathname.includes('/dashboard') },
    { 'sidebar-off': !openSB }
  )

  return (
    <div id="wrapper">
      {authed && <SideBar toggle={toggleSB} isOpen={openSB} />}
      <div id="main" className={mainClass}>
        <header id="header">
          <div className="wrap">
            <TopBar toggle={() => toggleSB(!openSB)} isOpen={openSB} />
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

export default withRouter(App)
