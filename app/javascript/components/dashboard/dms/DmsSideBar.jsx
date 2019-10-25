import React, { Component, useCallback } from 'react'
import { submit } from 'redux-form'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import CreateFolder from './user/CreateFolder'

export const DmsSideBarItem = ({ path, label, icon, root, nested, projectCode, dmsSections }) => {
  const dispatch = useDispatch()

  const remoteSubmit = useCallback(() => {
    if (!projectCode) {
      dispatch(submit('convention_code_form'))
    } else if (!dmsSections) {
      dispatch(submit('originating_company'))
      dispatch(submit('document_type'))
      dispatch(submit('discipline'))
    }
  }, [projectCode])

  return (
    <Route path={path} exact>
      {({ match, location }) => {
        const matched = match || location.pathname.indexOf(root) > -1
        return (
          <li className='dms-sidebar-menu__item'>
            {projectCode && dmsSections
              ? <Link className={classnames('btn', { 'active': matched })} to={path}>
                  <span className={classnames('dark-gray mr-2', icon)} />
                  <span className='head-button__gray-text'>{label}</span>
                </Link>
              : <button className={classnames('btn', { 'active': matched })} onClick={remoteSubmit} type='submit'>
                  <span className={classnames('dark-gray mr-2', icon)} />
                  <span className='head-button__gray-text'>{label}</span>
                </button>}
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
}

export function Folders({ folders, projectId }) {
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)
  
  return (
    <div className='dms-sidebar-menu__block'>
      <h4>My Folders</h4>
      <ul className='dms-sidebar-menu__list'>
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/my_documents`}
          label='My documents'
          icon='icon-folder-image'
          projectCode={projectCode}
          dmsSections={dmsSections}
        />
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/all`}
          label='All documents'
          icon='icon-folder-image-1'
          projectCode={projectCode}
          dmsSections={dmsSections}
        />
        {folders.map(({ id, title }, i) => (
          <DmsSideBarItem
            key={i}
            path={`/dashboard/projects/${projectId}/documents/folders/${id}`}
            label={title}
            icon='icon-folder-empty'
            projectCode={projectCode}
            dmsSections={dmsSections}
          />
        ))}

        <CreateFolder trigger={
          <li className='dms-sidebar-menu__item add-button'>
            <button className='btn d-flex align-items-center openFolderForm' type='button'>
              <span className='icon-add_1 mr-2' />
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
    const { project_code, dmsSections, folders, match: { path, params: {  project_id } } } = this.props
    const masterPath = `/dashboard/projects/${project_id}/documents/master`
    // TODO: Need check for master's permit
    
    const menuItems = [
      {
        title: 'Overview',
        icon: 'icon-task-checklist-check',
        path: project_code && dmsSections ? `/dashboard/projects/${project_id}/documents/` : '#'
      },
      {
        title: 'DMS User Settings',
        icon: 'icon-task-list-settings',
        path: project_code && dmsSections ? `/dashboard/projects/${project_id}/documents/settings/` : '#'
      },
      {
        title: 'Document planning',
        icon: 'icon-calendar-3',
        path: project_code && dmsSections ? `/dashboard/projects/${project_id}/documents/planning/` : '#'
      },
      {
        title: 'Master settings',
        icon: 'icon-task-list-settings',
        path: project_code && dmsSections ? `${masterPath}/edit_convention` : `${masterPath}/codifications/1/`,
        root: `${masterPath}/`
      }
    ]

    const masterMenu = [
      {
        title: 'Upload form',
        icon: 'icon-task-checklist-check',
        path: `${masterPath}/edit_convention/`
      },
      {
        title: 'Access rights',
        icon: 'icon-task-list-settings',
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
        icon: 'icon-search-alternate',
        path: `${masterPath}/quick_search/`
      },
      {
        title: 'Codification',
        icon: 'icon-file-code-home',
        path: `${masterPath}/codifications/1/`,
        root: `${masterPath}/codifications/`,
        nested: [
          {
            title: <div>Codification 1 < span className='icon-check_1 ml-2' /></div>,
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
        icon: 'icon-business-team-goal',
        path: `${masterPath}/distribution_group/`
      },
      {
        title: 'Review managment',
        icon: 'icon-task-list-settings',
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
                projectCode={project_code}
                dmsSections={dmsSections}
                label={title}
                icon={icon}
                root={root}
              />
            </React.Fragment>
          ))}
        </ul>
        {(() => {
          if (path.includes('dashboard/projects/:project_id/documents/folders')) {
            return <Folders folders={folders} projectId={project_id} />
          } else if (path.includes('/master/')) {
            return (
              <React.Fragment>
                <h4>Master settings</h4>
                <ul className='dms-sidebar-menu__list'>
                  {masterMenu.map(({ path, title, icon, root, nested }, i) => (
                    <React.Fragment key={i}>
                      <DmsSideBarItem
                        path={project_code ? path : `#`}
                        projectCode={project_code}
                        dmsSections={dmsSections}
                        label={title}
                        icon={icon}
                        root={root}
                        nested={nested}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </React.Fragment>)}
        })()}
      </div>
    )

  }

  render() {
    const { children, match: { params: { project_id } } } = this.props

    return (
      <React.Fragment>
        <div className='dms-sidebar-menu'>
          {this.renderMainItems()}
          {children}

          <Link to={`/dashboard/projects/${project_id}`} className='btn-back-to-prev-page'>
            <span className='icon-Arrow_2_left mr-2'><span className='path1'></span><span className='path2'></span></span>
            BACK
          </Link>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ projects, folders }) => ({
  folders: folders.allFolders,
  project_code: projects.current.project_code,
  dmsSections: projects.current.dmsSections
})

export default connect(mapStateToProps)(withRouter(DmsSideBar))
