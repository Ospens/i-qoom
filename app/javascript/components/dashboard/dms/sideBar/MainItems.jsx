import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router-dom'
import DmsSideBarItem from './DmsSideBarItem'
import Folders from './Folders'
import { fetchPlannedLists } from '../../../../actions/plannedListActions'

const codificationTitle = (
  <div>
    <span>Codification 1</span>
    <span className="icon-check_1 ml-2" />
  </div>
)

const menuItems = (projectCode, dmsSections, projectId, masterPath) => [
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
    type: 'plannedList',
    root: `/dashboard/projects/${projectId}/documents/planning/`
  },
  {
    title: 'Master settings',
    icon: 'icon-task-list-settings',
    path: projectCode && dmsSections
      ? `${masterPath}/edit_convention`
      : `${masterPath}/codifications/1/`,
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
      }
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
        title: codificationTitle,
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
      }
    ]
  },
  // {
  //   title: 'Distribution groups',
  //   icon: 'icon-business-team-goal',
  //   path: `${masterPath}/distribution_group/`
  // },
  {
    title: 'Review management',
    icon: 'icon-task-list-settings',
    path: '#' // `${masterPath}/planning/`
  }
]

function MainItems() {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const { path } = useRouteMatch()
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)
  useEffect(() => {
    dispatch(fetchPlannedLists(projectId))
  }, [dispatch, projectId])
  // TODO: Need check for master's permit
  const masterPath = `/dashboard/projects/${projectId}/documents/master`

  return (
    <div className="dms-sidebar-menu__block">
      <h4>DMS menu</h4>
      <ul className="dms-sidebar-menu__list">
        {menuItems(projectId, dmsSections, projectId, masterPath).map(({
          path: menuPath, title, icon, root, type
        }) => (
          <DmsSideBarItem
            key={`${menuPath}${title}`}
            path={menuPath}
            label={title}
            icon={icon}
            root={root}
            type={type}
          />
        ))}
      </ul>
      {(() => {
        if (path.includes('dashboard/projects/:projectId/documents/folders')) {
          return <Folders />
        } if (path.includes('/master/')) {
          return (
            <React.Fragment>
              <h4>Master settings</h4>
              <ul className="dms-sidebar-menu__list">
                {masterMenu(masterPath).map(({
                  path: menuPath, title, icon, root, nested
                }) => (
                  <React.Fragment key={`${menuPath}${title}`}>
                    <DmsSideBarItem
                      path={projectCode ? menuPath : '#'}
                      label={title}
                      icon={icon}
                      root={root}
                      nested={nested}
                    />
                  </React.Fragment>
                ))}
              </ul>
            </React.Fragment>
          )
        }
        return <Fragment />
      })()}
    </div>
  )
}

export default MainItems
