import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import ReactSVG from 'react-svg'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'
import docPlanIcon from '../../../images/calendar-3'
import classnames from 'classnames'

export const DmsSideBarItem = ({ path, label, icon, root, nested}) => (
  <Route path={path} exact>
    {({ match, location }) => {
      const matched = match || location.pathname.indexOf(root) > -1
      return (
        <li className="dms-sidebar-menu__item">
          <Link className={classnames('btn', { 'active': matched })} to={path}>
            <ReactSVG
              svgStyle={{ height: 20, width: 20, marginRight: 10 }}
              src={icon}
            />
            <span className="head-button__gray-text">{label}</span>
          </Link>
          {matched && nested &&
          <ul className='dms-sidebar-menu__sublitem'>
            {nested.map((subItem, i) => (
              <li
                key={i}
                className='dms-sidebar-menu__sublink'
              >
                <Link
                  className={classnames({ 'active': location.pathname.indexOf(subItem.path) > -1})}
                  to={subItem.path}
                >
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>}
        </li>
      )}}
  </Route>
)

class DmsSideBar extends Component {

  renderMainItems = () => {
    const { projectId } = this.props

    // TODO: Need check for master's permit
    const menuItems = [
      {
        title: 'Overview',
        icon: overviewIcon,
        path: `/dashboard/projects/${projectId}/documents/`
      },
      {
        title: 'DMS Settings',
        icon: dmsSettingsIcon,
        path: `/dashboard/projects/${projectId}/documents/settings/`
      },
      {
        title: 'Document planning',
        icon: docPlanIcon,
        path: `/dashboard/projects/${projectId}/documents/planning/`
      },
      {
        title: 'Master settings',
        icon: docPlanIcon,
        path: `/dashboard/projects/${projectId}/documents/master/edit_convention`,
        root: `/dashboard/projects/${projectId}/documents/master/`
      }
    ]

    const masterMenu = [
      {
        title: 'Upload form',
        icon: overviewIcon,
        path: `/dashboard/projects/${projectId}/documents/master/edit_convention/`
      },
      {
        title: 'Access rights',
        icon: dmsSettingsIcon,
        path: `/dashboard/projects/${projectId}/documents/master/access_rights/members/`,
        root: `/dashboard/projects/${projectId}/documents/master/access_rights/`,
        nested: [
          {
            title: 'Members',
            path: `/dashboard/projects/${projectId}/documents/master/access_rights/members/`
          },
          {
            title: 'Teams',
            path: `/dashboard/projects/${projectId}/documents/master/access_rights/teams/`
          },
        ]
      },
      {
        title: 'Quick search',
        icon: docPlanIcon,
        path: '/dashboard/documents/master/planning/'
      },
      {
        title: 'Codification',
        icon: dmsSettingsIcon,
        path: '/dashboard/documents/master/planning/'
      },
      {
        title: 'Distribution groups',
        icon: dmsSettingsIcon,
        path: '/dashboard/documents/master/planning/'
      },
      {
        title: 'Review managment',
        icon: dmsSettingsIcon,
        path: '/dashboard/documents/master/planning/'
      }
    ]

    return (
      <div className='dms-sidebar-menu__block'>
        <h4>DMS menu</h4>
        <ul className='dms-sidebar-menu__list'>
          {menuItems.map(({ path, title, icon, root }, i) => (
            <React.Fragment key={i}>
              <DmsSideBarItem
                path={path}
                label={title}
                icon={icon}
                root={root}
              />
            </React.Fragment>
          ))}
        </ul>
        <h4>Master settings</h4>
        <ul className='dms-sidebar-menu__list'>
          {masterMenu.map(({ path, title, icon, root, nested }, i) => (
            <React.Fragment key={i}>
              <DmsSideBarItem
                path={path}
                label={title}
                icon={icon}
                root={root}
                nested={nested}
              />
            </React.Fragment>
          ))}
        </ul>
      </div>
    )

  }

  render() {
    const { children } = this.props

    return (
      <React.Fragment>
        <div className='dms-sidebar-menu'>
          {this.renderMainItems()}
          {children}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ projects }) => ({
  projectId: projects.current.id
})

export default connect(mapStateToProps)(DmsSideBar)
