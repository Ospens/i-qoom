import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import plus from '../../../images/add_1'
import cogs from '../../../images/cog-double'
import WelcomeModal from './ModalWelcome'
import ModalCreateProject from './ModalCreateProject'

class ProjectOverview extends Component {

  state = {
    projectModal: false
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
            <div className='project-card in-preparation'>
              <ReactSVG
                svgStyle={{ height: 30, width: 30 }}
                src={cogs}
                className='cogs'
              />
              <label>Project title</label>
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
          <div className='col-sm-4'>
            <div className='project-card blank' onClick={this.openCreateProjectModal}>
              <ReactSVG
                svgStyle={{ height: 20, width: 20 }}
                src={plus}
              />
              <label>Create a new project</label>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className='project-card blank'>
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
