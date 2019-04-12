import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import plus from '../../../images/add_1'
import WelcomeModal from './ModalWelcome'
import ModalCreateProject from './ModalCreateProject'

class ProjectOverview extends Component {

  state = {
    projectModal: true
  }

  openCreateProjectModal = () => {
    this.setState({ projectModal: true })
  }

  closeCreateProjectModal = () => {
    this.setState({ projectModal: false })
  }

  render() {
    const { projectModal } = this.state
    console.log(projectModal)
    return (
      <div>
        <h2 className='page-title'>Project ovreview</h2>

        <div className='row row-projects'>
          <div className='col-sm-4'>
            <div className='project-card'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20 }}
                className='plus-icon'
                src={plus}
              />
              <label>Create a new project</label>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className='project-card' onClick={this.openCreateProjectModal}>
              <ReactSVG
                svgStyle={{ height: 20, width: 20 }}
                src={plus}
              />
              <label>Create a new project</label>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className='project-card'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20 }}
                src={plus}
              />
              <label>Create a new project</label>
            </div>
          </div>
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

export default ProjectOverview
