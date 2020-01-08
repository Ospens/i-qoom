import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SideBarItem from './SideBarItem'

function ProjectContent() {
  const { projectId } = useParams()
  const {
    project_code: projectCode,
    dmsSections,
    access_rights: {
      dms_module_access: dmsModuleAccess,
      dms_module_master: dmsModuleMaster,
      admin
    }
  } = useSelector(({ projects }) => projects.current)
  const dmsAccess = dmsModuleAccess || dmsModuleMaster

  return (
    <div className="mb-4">
      <ul className="nav flex-column nav-items">
        <li className="nav-item">
          <span className="sidebar_section-title">Frequently used</span>
        </li>
        <SideBarItem path="/dashboard/" label="Project overview" />
        {admin
        && (
          <SideBarItem
            path={`/dashboard/projects/${projectId}`}
            label="Project"
          />
        )}
      </ul>
      <ul className="nav flex-column nav-items">
        <li className="nav-item">
          <span className="sidebar_section-title">Commercial Management</span>
        </li>
        {dmsAccess
        && (
          <SideBarItem
            path={projectCode && dmsSections
              ? `/dashboard/projects/${projectId}/documents/`
              : `/dashboard/projects/${projectId}/documents/master/codifications/1`}
            root={`/dashboard/projects/${projectId}/documents/`}
            label="Document Management"
          />
        )}
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
