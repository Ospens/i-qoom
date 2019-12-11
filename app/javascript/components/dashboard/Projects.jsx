import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, useRouteMatch, useParams, useHistory } from 'react-router-dom'
import ProjectSettings from './projectSettings/ProjectSettings'
import DMS from './dms/DMS'
import { startFetchProject } from '../../actions/projectActions'
import { startEditConvention } from '../../actions/conventionActions'
import Page from '../../elements/Page'

function Projects() {
  const { projectId } = useParams()
  const history = useHistory()
  const { path } = useRouteMatch()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startFetchProject(projectId)).then(response => {
      if (response.status === 403) {
        history.push({ pathname: '/menu' })
      } else {
        dispatch(startEditConvention(projectId))
      }
    })
  }, [dispatch, projectId])

  return (
    <Switch>
      <Page
        path={`${path}/documents`}
        component={DMS}
      />
      <Page
        title="Project settings"
        path={path}
        component={ProjectSettings}
      />
    </Switch>
  )
}

export default Projects
