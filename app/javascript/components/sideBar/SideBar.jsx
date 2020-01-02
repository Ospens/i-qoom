import React, { Fragment } from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProjectContent from './ProjectContent'
import AdminContent from './AdminContent'
import SideBarItem from './SideBarItem'

function dashboardContent() {
  return (
    <ul className="nav flex-column nav-items">
      <li className="nav-item">
        <span className="sidebar_section-title">Frequently used</span>
      </li>
      <SideBarItem path="/dashboard/" label="Project overview" />
    </ul>
  )
}

function SideBar({ isOpen, toggle }) {
  const { pathname } = useLocation()
  const isAdmin = useSelector(({ user }) => user.isAdmin)
  const currentProject = useSelector(({ projects }) => projects.current)
  const sideBarShow = isAdmin || pathname.includes('/dashboard')

  if (!sideBarShow) return <Fragment />

  const mainClass = classnames('sidebar',
    { 'sidebar-admin-panel': isAdmin },
    { 'is-visible': isOpen })
  return (
    <aside className={mainClass}>
      <div className="sidebar-sticky">
        <div className="side-bar-logo">
          <div className="side-bar-logo__container">
            <i className="svg-icon logo-header" />
            {isAdmin && <span className="text-white">Admin access</span>}
          </div>
          <button type="button" onClick={toggle}>
            <span className="icon-Burgermenu_1 white" />
          </button>
        </div>
        {(() => {
          if (pathname.includes('/dashboard/projects')) {
            return <ProjectContent />
          } if (pathname.includes('/dashboard')) {
            return dashboardContent()
          } if (isAdmin) {
            return <AdminContent />
          }
          return <Fragment />
        })()}
      </div>
      {pathname.includes('/dashboard/projects')
        && (
          <div className="active-project">
            <div className="project-description">
              <div className="active-project-text">
                <span>Active project</span>
              </div>
              <div>
                <span className="active-project-title">{currentProject.name}</span>
              </div>
            </div>
            <span className="icon-cog-double-2 white" />
          </div>
        )}
    </aside>
  )
}

export default SideBar
