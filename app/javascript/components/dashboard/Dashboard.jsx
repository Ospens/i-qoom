import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './Dashboard.scss'
import '../../styles/Sidebar.scss'
import 'react-datepicker/dist/react-datepicker.css'
import ProjectOverview from './projectOverview/ProjectOverview'
import ProjectSettings from './projectSettings/ProjectSettings'
import DMS from './dms/DMS'

class Dashboard extends Component {

  render() {
    const { match } = this.props
    return (
      <div className='dashboard-container'>
        <div className='main-content'>
          <main role='main' className='dashboard-content'>
            <Switch>
              <Route path={`${match.path}/documents`} component={DMS} />
              <Route path={`${match.path}/projects/:project_id`} component={ProjectSettings} />
              <Route path='/' component={ProjectOverview}/>
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  info: state.user
})

export default connect(mapStateToProps)(Dashboard)
