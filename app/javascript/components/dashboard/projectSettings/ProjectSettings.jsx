import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Tabs from '../../../elements/Tabs'
import ProjectDetails from './projectDetails/ProjectDetails'
import ProjectStatus from './ProjectStatus'
import MemberManagment from './MemberManagment'

const renderProjectStatus = (color, text) => (
  <React.Fragment>
    <span className='green-dot' />
    <span>Project status</span>
    <span className='ml-1'>({text})</span>
  </React.Fragment>
)

function ProjectSettings() {
  const projectName = useSelector(state => state.projects.current.name)
  
  return (
    <div className='project-settings'>
      <div className='project-title-editable'>{projectName}</div>
      <span className='block-title mt-1'>(Selected project)</span>

      <Tabs>
        <div label='Project details'>
          <ProjectDetails />
        </div>
        <div label='Member managment'>
          <MemberManagment />
        </div>
        <div label={renderProjectStatus('color', 'active')}>
          <ProjectStatus />
        </div>
      </Tabs>

      <Link to='/dashboard' className='btn-back-to-project'>
        <i className='svg-icon arrow-left-icon-2' />
        BACK TO THE PROJECT OVERVIEW
      </Link>
    </div>
  )
}

export default ProjectSettings
