import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import plus from '../../../images/add_1'
import cogs from '../../../images/cog-double'
import WelcomeModal from './ModalWelcome'
import ModalCreateProject from './ModalCreateProject'
import { startFetchProjects, exitProject } from '../../../actions/projectActions'

class ProjectOverview extends Component {

  state = {
    projectModal: false
  }

  componentWillMount() {
    const { startFetchProjects, exitProject } = this.props
    exitProject()
    startFetchProjects()
  }

  openCreateProjectModal = () => {
    this.setState({ projectModal: true })
  }

  closeCreateProjectModal = () => {
    this.setState({ projectModal: false })
  }

  render() {
    const { projectModal } = this.state
    const { projects: { allProjects } } = this.props

    return (
      <div>
        <div className='row row-projects'>
          {allProjects.map(project => (
            <div className='col-sm-4' key={project.id}>
              <div className='project-card in-preparation'>
                <Link to={`/dashboard/projects/${project.id}`}>
                  <ReactSVG
                    svgStyle={{ height: 30, width: 30 }}
                    src={cogs}
                    className='cogs'
                  />
                </Link>
                <label>{project.name}</label>
                <div className='row project-card__bottom'>
                  <div className='col-3'>
                    Planning
                  </div>
                  <div className='col-3'>
                    Development
                  </div>
                  <div className='col-3'>
                    Execution
                  </div>
                  <div className='col-3'>
                    Operation
                  </div>
                </div>
              </div>
            </div>
          ))}
          {[...Array(3 - allProjects.length)].map((e, i) => (
            <div className='col-sm-4' key={i}>
              <div className='project-card blank' onClick={this.openCreateProjectModal}>
                <ReactSVG
                  svgStyle={{ height: 20, width: 20 }}
                  src={plus}
                />
                <label>Create a new project</label>
              </div>
            </div>
          ))}
        </div>
        <div className='statuses'>
          <label>Status</label>
          <ul>
            <li>
              <span className='green-dot' />
              <span>Active</span>
            </li>
            <li>
              <span className='yellow-dot' />
              <span>In Preparation</span>
            </li>
          </ul>
        </div>
        <WelcomeModal />
        <ModalCreateProject isOpen={projectModal} closeModal={this.closeCreateProjectModal}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProjects: () => dispatch(startFetchProjects()),
  exitProject: () => dispatch(exitProject())
})

const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)
