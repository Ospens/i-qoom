import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router-dom'
import ProjectSettings from './projectSettings/ProjectSettings'
import DMS from './dms/DMS'
import { startFetchProject } from '../../actions/projectActions'
import Page from '../../elements/Page'

class Projects extends Component {

  UNSAFE_componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Page
          path={`${match.path}/documents`}
          component={DMS}
        />
        <Page
          title='Project settings'
          path={`${match.path}`}
          component={ProjectSettings}
        />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProject: (id) => dispatch(startFetchProject(id))
})

const mapStateToProps = state => ({
  project: state.projects.current
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Projects))
