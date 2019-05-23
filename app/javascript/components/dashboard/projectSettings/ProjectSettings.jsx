import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import { startFetchProject } from '../../../actions/projectActions'
import ProjectDetails from './ProjectDetails'
import ProjectStatus from './ProjectStatus'
import MemberManagment from './MemberManagment'
import arrowLeft from '../../../images/Arrow_2_left'
import classnames from 'classnames'

class ProjectSettings extends Component {

  state = {
    tab: 1
  }

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
    const { tab } = this.state
    return (
      <div className='project-settings'>
        <div className='project-title-editable'>{project.name}</div>
        <span className='block-title mt-1'>(Selected project)</span>

        <div className='nav-bar'>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 1 })} onClick={() => this.changeTab(1)}>
              Project details
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element', { 'active': tab === 2 })} onClick={() => this.changeTab(2)}>
              Member managment
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className={classnames('nav-bar-element align-items-center', { 'active': tab === 3 })} onClick={() => this.changeTab(3)}>
              {this.renderProjectStatus('color', 'active')}
            </button>
          </div>
        </div>

        {tab === 1 && <ProjectDetails {...project}/>}
        {tab === 2 && <MemberManagment />}
        {tab === 3 && <ProjectStatus />}

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
