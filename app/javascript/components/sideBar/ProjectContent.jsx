import React from 'react'
import { useSelector } from 'react-redux'
import SideBarItem from './SideBarItem'

function ProjectContent() {
  const currentProject = useSelector(({ projects }) => projects.current)
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)

  return (
    <div className='mb-4'>
      <ul className='nav flex-column nav-items'>
        <li className='nav-item'>
          <span className='sidebar_section-title'>Frequently used</span>
        </li>
        <SideBarItem path='/dashboard/' label='Dashboard' />
        <SideBarItem
          path={`/dashboard/projects/${currentProject.id}`}
          label='Project'
        />
        <SideBarItem
          path={projectCode && dmsSections
            ? `/dashboard/projects/${currentProject.id}/documents/`
            : `/dashboard/projects/${currentProject.id}/documents/master/codifications/1`}
          root={`/dashboard/projects/${currentProject.id}/documents/`}
          label='Documents'
        />
      </ul>
      <ul className='nav flex-column nav-items'>
        <li className='nav-item'>
          <span className='sidebar_section-title'>Commercial Managment</span>
        </li>
        <SideBarItem path='#' label='Time sheet' />
        <SideBarItem path='#' label='Cost Managment' />
        <SideBarItem path='#' label='Templates' />
        <SideBarItem path='#' label='Invoices' />
      </ul>
      <ul className='nav flex-column nav-items'>
        <li className='nav-item'>
          <span className='sidebar_section-title'>Project Managment</span>
        </li>
        <SideBarItem path='#' label='Technical Clarification' />
        <SideBarItem path='#' label='Quality Control' />
        <SideBarItem path='#' label='Correspondences' />
      </ul>
    </div>
  )
}

export default ProjectContent
