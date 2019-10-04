import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import SideBarItem from './SideBarItem'
import { Dropdown, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const tagOptions = [
  {
    key: 'English',
    text: 'English',
    value: 'English',
  },
  {
    key: 'German',
    text: 'German',
    value: 'German',
  },
  {
    key: 'Spanish',
    text: 'Spanish',
    value: 'Spanish',
  }
]

class SideBar extends Component {

  renderAdminContent = () => (
    <ul className='nav flex-column nav-items'>
      <li className='nav-item'>
        <span className='gray-purple'>Selected language version</span>
      </li>
      <li className='nav-item'>
        <Dropdown
          text='English'
          button
          pointing='left'
          icon={<i className='arrow right ml-2' />}
          closeOnBlur={false}
          closeOnChange={false}
        >
          <Dropdown.Menu>
            <Input
              icon={<span className='icon-search-alternate' /> }
              placeholder='Choose language'
            />
            <Dropdown.Menu scrolling>
              {tagOptions.map(option => (
                <Dropdown.Item key={option.value} {...option} />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className='nav-item mt-4'>
        <span className='gray-purple'>Administration</span>
      </li>
      <SideBarItem path='/admin_panel' label='Homepage' />
      <SideBarItem path='/admin_panel/users' label='Users' />
      <SideBarItem path='/admin_panel/terms' label="T & C's" />
    </ul>
  )

  renderDashboardContent = () => (
    <ul className='nav flex-column nav-items'>
      <li className='nav-item'>
        <span className='sidebar_section-title'>Frequently used</span>
      </li>
      <SideBarItem path='/dashboard/' label='Project overview' />
    </ul>
  )

  renderProjectContent = () => {
    const { currentProject, projectCode } = this.props
    
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
            path={projectCode === null ? `/dashboard/projects/${currentProject.id}/documents/master/codifications/1` : `/dashboard/projects/${currentProject.id}/documents/`}
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

  render() {
    const { location: { pathname }, isAdmin, isOpen, toggle, currentProject } = this.props
    const sideBarShow = isAdmin || pathname.includes('/dashboard')

    if (!sideBarShow) {
      return null
    }

    const mainClass = classnames('sidebar', { 'sidebar-admin-panel': isAdmin}, { 'is-visible': isOpen })
    return (
      <aside className={mainClass}>
        <div className='sidebar-sticky'>
          <div className='side-bar-logo'>
            <div className='side-bar-logo__container'>
              <i className='svg-icon logo-header sidebar' />
              {isAdmin && <span className='text-white'>Admin access</span>}
            </div>
            <button type='button' onClick={toggle}>
              <span className='icon-Burgermenu_1 white' />
            </button>
          </div>
          {(() => {
            if (pathname.includes('/dashboard/projects')) {
              return(this.renderProjectContent())
            } else if (pathname.includes('/dashboard')) {
              return (this.renderDashboardContent())
            } else if (isAdmin) {
              return (this.renderAdminContent())
            }
          })()}
        </div>
        {pathname.includes('/dashboard/projects')&& 
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
}

const mapStateToProps = ({ user, projects }) => ({
  authed: user.authStatus,
  isAdmin: user.isAdmin,
  currentProject: projects.current,
  projectCode: projects.current.project_code
})

export default connect(mapStateToProps)(withRouter(SideBar))
