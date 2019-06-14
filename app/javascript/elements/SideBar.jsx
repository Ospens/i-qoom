import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { connect } from 'react-redux'
import logo from '../images/Logo_header'
import cogs from '../images/cog-double'
import searchIcon from '../images/search-alternate'
import burgerOpen from '../images/Burgermenu_1'
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
            <Input icon={
              <ReactSVG
                svgStyle={{ height: 15 }}
                src={searchIcon}
                className='svg-icon'
              />
            } placeholder='Choose language' />
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
        <span className='light-grey'>Frequently used</span>
      </li>
      <SideBarItem path='/dashboard/' label='Project overview' />
    </ul>
  )

  renderProjectContent = () => {
    const { currentProject } = this.props
    return (
      <div className='mb-4'>
        <ul className='nav flex-column nav-items'>
          <li className='nav-item'>
            <span className='light-grey'>Frequently used</span>
          </li>
          <SideBarItem path='/dashboard/' label='Dashboard' />
          <SideBarItem path='/dashboard/' label='Contracts' />
          <SideBarItem
            path={`/dashboard/projects/${currentProject.id}/documents/`}
            root={`/dashboard/projects/${currentProject.id}/documents/`}
            label='Documents'
          />
        </ul>
        <ul className='nav flex-column nav-items'>
          <li className='nav-item'>
            <span className='light-grey'>Commercial Managment</span>
          </li>
          <SideBarItem path='/dashboard/' label='Time sheet' />
          <SideBarItem path='/dashboard/' label='Cost Managment' />
          <SideBarItem path='/dashboard/' label='Templates' />
          <SideBarItem path='/dashboard/' label='Invoices' />
        </ul>
        <ul className='nav flex-column nav-items'>
          <li className='nav-item'>
            <span className='light-grey'>Project Managment</span>
          </li>
          <SideBarItem path='/dashboard/' label='Technical Clarification' />
          <SideBarItem path='/dashboard/' label='Quality Control' />
          <SideBarItem path='/dashboard/' label='Correspondences' />
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
            <div>
              <ReactSVG
                svgStyle={{ height: 30, width: 100 }}
                src={logo}
              />
              {isAdmin && <span className='text-white'>Admin access</span>}
            </div>
            <ReactSVG
              svgStyle={{ height: 10, marginLeft: 20 }}
              src={burgerOpen}
              className='burger-button'
              onClick={toggle}
            />
          </div>
          {(() => {
            if (currentProject.id) {
              return(this.renderProjectContent())
            } else if (pathname.includes('/dashboard')) {
              return (this.renderDashboardContent())
            } else if (isAdmin) {
              return (this.renderAdminContent())
            }
          })()}
        </div>
        {currentProject.id && 
        <div className='active-project'>
          <div className='project-description'>
            <span className='active-project-text'>Active project</span>
            <span className='active-project-title'>{currentProject.name}</span>
          </div>
          <ReactSVG
            svgStyle={{ height: 20 }}
            src={cogs}
            className='active-project-cogs'
          />
        </div>}
      </aside>
    )
  }
}

const mapStateToProps = ({ user, projects }) => ({
  authed: user.authStatus,
  isAdmin: user.isAdmin,
  currentProject: projects.current
})

export default connect(mapStateToProps)(withRouter(SideBar))
