import React, { Component } from 'react'
import SideBar from './SideBar'
import TopBar from './TopBar'
import UserProfile from './UserProfile'
import { Route, Switch } from 'react-router-dom'
import UsersTable from './UsersTable'
import LandingPage from '../landing/LandingPage'
import Terms from '../landing/Terms'
import '../../styles/Sidebar.scss'
import './AdminPanel.scss'

class AdminPanel extends Component {
  state = {  }
  render() {
    const { location, match } = this.props
    return (
      <div className='admin-panel-container'>
        <SideBar pathName={match}/>
        <div className='main-content'>
          {location.pathname !== match.path && <TopBar />}
          <main role='main'>
            <Switch>
              <Route path={`${match.path}/users/:user_id`} component={UserProfile} />
              <Route path={`${match.path}/users`} component={UsersTable} />
              <Route path={`${match.path}/terms`} component={Terms} />
              <Route path='/' component={LandingPage} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}
 
export default AdminPanel