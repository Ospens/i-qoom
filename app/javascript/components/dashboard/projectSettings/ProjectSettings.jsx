import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ProjectSettings.scss'
import { startFetchProject } from '../../../actions/projectActions'

class ProjectSettings extends Component {

  componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }


  render() {
    return (
      <div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProject: (id) => dispatch(startFetchProject(id))
})

const mapStateToProps = state => ({
  project: state.projects.current
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings)
