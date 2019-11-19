import React from 'react'
import classnames from 'classnames'
import UserProfile from './UserProfile'
import { Route, Switch } from 'react-router-dom'
import UsersTable from './UsersTable'
import LandingPage from '../landing/LandingPage'
import Terms from '../landing/Terms'
import '../../styles/Sidebar.scss'
import './AdminPanel.scss'

function AdminPanel({ location, match }) {
  const mainClass = classnames('admin-panel-container', { 'p-0': location.pathname === match.path })
  
  return (
    <div className={mainClass}>
      <Switch>
        <Route path={`${match.path}/users/:user_id`} component={UserProfile} />
        <Route path={`${match.path}/users`} component={UsersTable} />
        <Route path={`${match.path}/terms`} render={() => <Terms editable={true} />} />
        <Route path='/' component={LandingPage} />
      </Switch>
    </div>
  )
}

export default AdminPanel
