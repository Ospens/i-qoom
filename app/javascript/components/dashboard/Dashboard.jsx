import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './Dashboard.scss'
import 'react-datepicker/dist/react-datepicker.css'
import ProjectOverview from './projectOverview/ProjectOverview'
import ProjectSettings from './projectSettings/ProjectSettings'
import SideBar from './SideBar'
import TopBar from './TopBar'

class Dashboard extends Component {

  render() {
    const { match } = this.props
    return (
      <div className='dashboard-container'>
        <SideBar />
        <div className='main-content'>
          <TopBar />
          <main role='main' className='dashboard-content'>
            <Switch>
              <Route path={`${match.path}/projects/:project_id`} component={ProjectSettings} />
              <Route path='/' component={ProjectOverview} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth
})

export default connect(mapStateToProps)(Dashboard)
