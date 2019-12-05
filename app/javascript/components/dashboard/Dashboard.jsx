import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './Dashboard.scss'
import '../../styles/Sidebar.scss'
import '../../styles/ckEditor.css'
import ProjectOverview from './projectOverview/ProjectOverview'
import Projects from './Projects'
import Page from '../../elements/Page'

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <main role="main" className="dashboard-content">
          <Switch>
            <Route
              path="/dashboard/projects/:projectId"
              component={Projects}
            />
            <Page
              exact
              title="Project overview"
              path="/dashboard/"
              component={ProjectOverview}
            />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
