import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ProjectSettings.scss'
import { startFetchProject } from '../../../actions/projectActions'
import ProjectDetails from './ProjectDetails'

class ProjectSettings extends Component {

  state = {
    tab: 1
  }

  changeTab = (val) => {
    this.setState({tab: val})
  }

  componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }

  render() {
    const { name } = this.props.project
    const { tab } = this.state
    return (
      <div className='project-settings'>
        <h2>Project settings</h2>
        <div className='project-title-editable'>{name}</div>
        <div className='nav-bar'>
          <div className='nav-bar-item'>
            <button className='nav-bar-element active' onClick={() => this.changeTab(1)}>
              Project details
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className='nav-bar-element' onClick={() => this.changeTab(2)}>
              Member managment
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className='nav-bar-element' onClick={() => this.changeTab(3)}>
              Project status
            </button>
          </div>
        </div>
        {tab === 1 &&<ProjectDetails />}
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
