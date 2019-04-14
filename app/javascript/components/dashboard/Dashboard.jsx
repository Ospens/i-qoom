import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import './Dashboard.scss'
import ProjectOverview from './projectOverview/ProjectOverview'
import SideBar from './SideBar'
import TopBar from './TopBar'

class Dashboard extends Component {

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <SideBar />
          <div className='col-md-9 ml-sm-auto col-lg-10 px-5'>
            <TopBar />
            <main role='main' className='dashboard-content'>
              <Switch>
                <Route path='/' component={ProjectOverview} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth
})

export default connect(mapStateToProps)(Dashboard)
