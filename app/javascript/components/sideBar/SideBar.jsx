import React, { Fragment, useCallback } from 'react'
import classnames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProjectContent from './ProjectContent'
import AdminContent from './AdminContent'
import SideBarItem from './SideBarItem'
import { toggleSidebar } from '../../actions/projectActions'

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

function SideBar() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const iQoomAdmin = useSelector(({ user }) => user.iQoomAdmin)
  const currentProject = useSelector(({ projects }) => projects.current)
  const sideBarShow = iQoomAdmin || pathname.includes('/dashboard')
  const isOpen = useSelector(({ projects }) => projects.sidebar)
  const toggleOff = useCallback(() => dispatch(toggleSidebar(false)), [dispatch])

  if (!sideBarShow) return <Fragment />

  const mainClass = classnames('sidebar',
    { 'sidebar-admin-panel': iQoomAdmin },
    { 'is-visible': isOpen })
  return (
    <aside className={mainClass}>
      <div className="sidebar-sticky">
        <div className="side-bar-logo">
          <div className="side-bar-logo__container">
            <i className="svg-icon logo-header" />
            {iQoomAdmin && <span className="text-white">Admin access</span>}
          </div>
          <button type="button" onClick={toggleOff}>
            <span className="icon-Burgermenu_1 white" />
          </button>
        </div>
        {(() => {
          if (pathname.includes('/dashboard/projects')) {
            return <ProjectContent />
          } if (pathname.includes('/dashboard') && currentProject.isAdmin) {
            return dashboardContent()
          } if (iQoomAdmin) {
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
