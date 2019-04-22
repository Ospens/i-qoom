import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import { startFetchProject } from '../../../actions/projectActions'
import ProjectDetails from './ProjectDetails'
import MemberManagment from './MemberManagment'
import arrowLeft from '../../../images/Arrow_2_left'
import classnames from 'classnames'

class ProjectSettings extends Component {

  state = {
    tab: 2
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
            <button className={classnames('nav-bar-element', { 'active': tab === 3 })} onClick={() => this.changeTab(3)}>
              Project status
            </button>
          </div>
        </div>

        {tab === 1 &&<ProjectDetails />}
        {tab === 2 && <MemberManagment />}

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
