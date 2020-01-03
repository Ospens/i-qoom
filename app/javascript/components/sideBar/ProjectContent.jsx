import React from 'react'
import { useSelector } from 'react-redux'
import SideBarItem from './SideBarItem'

function ProjectContent() {
  const currentProject = useSelector(({ projects }) => projects.current)
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)

  return (
    <div className="mb-4">
      <ul className="nav flex-column nav-items">
        <li className="nav-item">
          <span className="sidebar_section-title">Frequently used</span>
        </li>
        <SideBarItem path="/dashboard/" label="Dashboard" />
        <SideBarItem
          path={`/dashboard/projects/${currentProject.id}`}
          label="Project"
        />
      </ul>
      <ul className="nav flex-column nav-items">
        <li className="nav-item">
          <span className="sidebar_section-title">Commercial Management</span>
        </li>
        <SideBarItem
          path={projectCode && dmsSections
            ? `/dashboard/projects/${currentProject.id}/documents/`
            : `/dashboard/projects/${currentProject.id}/documents/master/codifications/1`}
          root={`/dashboard/projects/${currentProject.id}/documents/`}
          label="Document Management"
        />
      </ul>
      <ul className="nav flex-column nav-items">
        <li className="nav-item">
          <span className="sidebar_section-title">Project Management</span>
        </li>
      </ul>
    </div>
  )
}

export default ProjectContent
