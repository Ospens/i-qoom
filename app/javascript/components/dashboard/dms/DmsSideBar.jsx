import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import CreateFolder from './user/CreateFolder'

export const DmsSideBarItem = ({ path, label, icon, root, nested }) => (
  <Route path={path} exact>
    {({ match, location }) => {
      const matched = match || location.pathname.indexOf(root) > -1
      return (
        <li className='dms-sidebar-menu__item'>
          <Link className={classnames('btn', { 'active': matched })} to={path}>
            <i className={classnames('svg-icon black mr-2', icon)} />
            <span className='head-button__gray-text'>{label}</span>
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

export const renderFoldersBlock = (folders, projectId) => {
  return (
    <div className='dms-sidebar-menu__block'>
      <h4>My Folders</h4>
      <ul className='dms-sidebar-menu__list'>
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/my_documents`}
          label='My documents'
          icon='folder-icon-3'
        />
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/all`}
          label='All documents'
          icon='folder-icon-3'
        />
        {folders.map(({ id, title }, i) => (
          <DmsSideBarItem
            key={i}
            path={`/dashboard/projects/${projectId}/documents/folders/${id}`}
            label={title}
            icon='folder-icon'
          />
        ))}

        <CreateFolder trigger={
          <li className='dms-sidebar-menu__item add-button'>
            <button className='btn d-flex align-items-center openFolderForm' type='button'>
              <i className='svg-icon blue-plus-icon mr-2' />
              <span>New folder</span>
            </button>
          </li>
          }
        />
      </ul>
    </div>
  )
}

class DmsSideBar extends Component {

  renderMainItems = () => {
    const { folders, match: { path, params: {  project_id } } } = this.props
    const masterPath = `/dashboard/projects/${project_id}/documents/master`

    // TODO: Need check for master's permit

    const menuItems = [
      {
        title: 'Overview',
        icon: 'task-checklist-icon',
        path: `/dashboard/projects/${project_id}/documents/`
      },
      {
        title: 'DMS Settings',
        icon: 'task-list-settings-icon',
        path: `/dashboard/projects/${project_id}/documents/settings/`
      },
      {
        title: 'Document planning',
        icon: 'calendar-icon-3',
        path: '#' // `/dashboard/projects/${project_id}/documents/planning/`
      },
      {
        title: 'Master settings',
        icon: 'calendar-icon-3',
        path: `${masterPath}/edit_convention`,
        root: `${masterPath}/`
      }
    ]

    const masterMenu = [
      {
        title: 'Upload form',
        icon: 'task-checklist-icon',
        path: `${masterPath}/edit_convention/`
      },
      {
        title: 'Access rights',
        icon: 'task-list-settings-icon',
        path: `${masterPath}/access_rights/members/`,
        root: `${masterPath}/access_rights/`,
        nested: [
          {
            title: 'Members',
            path: `${masterPath}/access_rights/members/`
          },
          {
            title: 'Teams',
            path: `${masterPath}/access_rights/teams/`
          },
        ]
      },
      {
        title: 'Quick search',
        icon: 'search-icon',
        path: `${masterPath}/quick_search/`
      },
      {
        title: 'Codification',
        icon: 'file-code-home',
        path: `${masterPath}/codifications/1/`,
        root: `${masterPath}/codifications/`,
        nested: [
          {
            title: 'Codification 1',
            path: `${masterPath}/codifications/1/`
          },
          {
            title: 'Codification 2',
            path: '#'
          },
          {
            title: 'Codification 3',
            path: '#'
          },
          {
            title: 'Settings',
            path: `${masterPath}/codifications/settings/`
          },
        ]
      },
      {
        title: 'Distribution groups',
        icon: 'business-team-icon',
        path: `${masterPath}/distribution_group/`
      },
      {
        title: 'Review managment',
        icon: 'task-list-settings-icon',
        path: '#' // `${masterPath}/planning/`
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
        {path.includes('dashboard/projects/:project_id/documents/folders')
          ? renderFoldersBlock(folders, project_id)
          : <React.Fragment>
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
            </React.Fragment>}
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

const mapStateToProps = ({ projects, folders }) => ({
  folders: folders.allFolders
})

export default connect(mapStateToProps)(withRouter(DmsSideBar))
