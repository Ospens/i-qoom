import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.scss'
import ProjectOverview from './projectOverview/ProjectOverview'
import SideBar from './SideBar'
import TopBar from './TopBar'

class Dashboard extends Component {

  state = {
    user: null
  }

  componentDidMount() {
    const { token } = this.props.info
    if ( !token ) {
      console.log('Unauthorization')
    }

    axios.get('/home', { headers: { Authorization: token } })
      .then(res => this.setState({user: res.data.hello}))
  }

  render() {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth
})

export default connect(mapStateToProps)(Dashboard)
