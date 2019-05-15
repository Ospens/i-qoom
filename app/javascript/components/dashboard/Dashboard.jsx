import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './Dashboard.scss'
import '../../styles/Sidebar.scss'
import 'react-datepicker/dist/react-datepicker.css'
import ProjectOverview from './projectOverview/ProjectOverview'
import Projects from './Projects'

class Dashboard extends Component {

  render() {
    return (
      <div className='dashboard-container'>
        <div className='main-content'>
          <main role='main' className='dashboard-content'>
            <Switch>
              <Route path='/dashboard/projects/:project_id' component={Projects} />
              <Route exact path='/dashboard/' component={ProjectOverview} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default Dashboard
