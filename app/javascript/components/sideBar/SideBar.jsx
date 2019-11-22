import React from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProjectContent from './ProjectContent'
import DashboardContent from './DashboardContent'
import AdminContent from './AdminContent'

function SideBar({ isOpen, toggle }) {
  const { pathname } = useLocation()
  const isAdmin = useSelector(({ user }) => user.isAdmin)
  const currentProject = useSelector(({ projects }) => projects.current)
  const sideBarShow = isAdmin || pathname.includes('/dashboard')

  if (!sideBarShow) return null

  const mainClass = classnames('sidebar', { 'sidebar-admin-panel': isAdmin }, { 'is-visible': isOpen })
  return (
    <aside className={mainClass}>
      <div className='sidebar-sticky'>
        <div className='side-bar-logo'>
          <div className='side-bar-logo__container'>
            <i className='svg-icon logo-header' />
            {isAdmin && <span className='text-white'>Admin access</span>}
          </div>
          <button type='button' onClick={toggle}>
            <span className='icon-Burgermenu_1 white' />
          </button>
        </div>
        {(() => {
          if (pathname.includes('/dashboard/projects')) {
            return <ProjectContent />
          } else if (pathname.includes('/dashboard')) {
            return <DashboardContent />
          } else if (isAdmin) {
            return <AdminContent />
          }
        })()}
      </div>
      {pathname.includes('/dashboard/projects') &&
        <div className='active-project'>
          <div className='project-description'>
            <div className='active-project-text'>
              <span>Active project</span>
            </div>
            <div>
              <span className='active-project-title'>{currentProject.name}</span>
            </div>
          </div>
          <span className='icon-cog-double-2 white' />
        </div>}
    </aside>
  )
}

export default SideBar
