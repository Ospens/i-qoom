import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import ProjectSettings from './projectSettings/ProjectSettings'
import DMS from './dms/DMS'
import { startFetchProject } from '../../actions/projectActions'

class Projects extends Component {

  componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route path={`${match.path}/documents`} component={DMS} />
        <Route path={`${match.path}`} component={ProjectSettings} />
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
