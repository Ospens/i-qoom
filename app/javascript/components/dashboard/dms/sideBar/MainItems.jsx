import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'
import DmsSideBarItem from './DmsSideBarItem'
import Folders from './Folders'

const menuItems = (projectCode, dmsSections, projectId, masterPath) =>[
  {
    title: 'Overview',
    icon: 'icon-task-checklist-check',
    path: projectCode && dmsSections ? `/dashboard/projects/${projectId}/documents/` : '#'
  },
  {
    title: 'DMS User Settings',
    icon: 'icon-task-list-settings',
    path: projectCode && dmsSections ? `/dashboard/projects/${projectId}/documents/settings/` : '#'
  },
  {
    title: 'Document planning',
    icon: 'icon-calendar-3',
    path: projectCode && dmsSections ? `/dashboard/projects/${projectId}/documents/planning/` : '#'
  },
  {
    title: 'Master settings',
    icon: 'icon-task-list-settings',
    path: projectCode && dmsSections ? `${masterPath}/edit_convention` : `${masterPath}/codifications/1/`,
    root: `${masterPath}/`
  }
]

const masterMenu = masterPath => [
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

function MainItems() {
  const { project_id } = useParams()
  const { path } = useRouteMatch()
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)
  const folders = useSelector(({ folders }) => folders.allFolders)

  // TODO: Need check for master's permit
  const masterPath = `/dashboard/projects/${project_id}/documents/master`

  return (
    <div className='dms-sidebar-menu__block'>
      <h4>DMS menu</h4>
      <ul className='dms-sidebar-menu__list'>
        {menuItems(project_id, dmsSections, project_id, masterPath).map(({ path, title, icon, root }, i) => (
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
      {(() => {
        if (path.includes('dashboard/projects/:project_id/documents/folders')) {
          return <Folders folders={folders} projectId={project_id} />
        } else if (path.includes('/master/')) {
          return (
            <React.Fragment>
              <h4>Master settings</h4>
              <ul className='dms-sidebar-menu__list'>
                {masterMenu(masterPath).map(({ path, title, icon, root, nested }, i) => (
                  <React.Fragment key={i}>
                    <DmsSideBarItem
                      path={projectCode ? path : `#`}
                      label={title}
                      icon={icon}
                      root={root}
                      nested={nested}
                    />
                  </React.Fragment>
                ))}
              </ul>
            </React.Fragment>)
        }
      })()}
    </div>
  )
}

export default MainItems
