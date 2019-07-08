import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import Tabs from '../../../elements/Tabs'
import { startFetchProject } from '../../../actions/projectActions'
import ProjectDetails from './projectDetails/ProjectDetails'
import ProjectStatus from './ProjectStatus'
import MemberManagment from './MemberManagment'
import arrowLeft from '../../../images/Arrow_2_left'

class ProjectSettings extends Component {

  changeTab = val => {
    this.setState({tab: val})
  }

  renderProjectStatus = (color, text) => (
    <React.Fragment>
      <span className='green-dot' />
      <span>Project status</span>
      <span className='ml-1'>({text})</span>
    </React.Fragment>
  )

  render() {
    const { project } = this.props

    return (
      <div className='project-settings'>
        <div className='project-title-editable'>{project.name}</div>
        <span className='block-title mt-1'>(Selected project)</span>

        <Tabs>
          <div label='Project details'>
            <ProjectDetails {...project} />
          </div>
          <div label='Member managment'>
            <MemberManagment />
          </div>
          <div label={this.renderProjectStatus('color', 'active')}>
            <ProjectStatus />
          </div>
        </Tabs>

        <Link to='/dashboard' className='btn btn-back-to-project'>
          <ReactSVG
            svgStyle={{ height: 25, width: 25, marginRight: 15 }}
            src={arrowLeft}
          />
          BACK TO THE PROJECT OVERVIEW
        </Link>
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
