import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from '../elements/PrivateRoute'
import LandingPage from './landing/LandingPage'
import Dashboard from './dashboard/Dashboard'
// import AdminPanel from './adminPanel/AdminPanel'
import TopBar from '../elements/TopBar'
import SideBar from '../elements/SideBar'
import LandingMenu from './landing/LandingMenu'

const App = ({ authed, isAdmin }) => {
  const [openSB, toggleSB] = useState(true)

  return (
    <BrowserRouter>
      <div id='wrapper'>
        {authed && <SideBar toggle={() => toggleSB(!openSB)} isOpen={openSB}/>}
        <div id='main'>
          <header id='header'>
            <div className='wrap'>
              <TopBar toggle={() => toggleSB(!openSB)} isOpen={openSB} />
            </div>
          </header>
          <Switch>
            <PrivateRoute path='/menu' authed={authed} component={LandingMenu} />
            <PrivateRoute authed={authed} path='/dashboard' component={Dashboard} title='Dashboard' />
            {/*<PrivateRoute authed={authed && isAdmin} path='/admin_panel' component={AdminPanel} />*/}
            <Route path='/' render={props => <LandingPage {...props} authed={authed} />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}
const mapStateToProps = ({ user }) => ({
  authed: user.authStatus,
  isAdmin: user.isAdmin
})

export default connect(mapStateToProps)(App)
