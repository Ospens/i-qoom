import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, withRouter } from 'react-router-dom'
import ProjectSettings from './projectSettings/ProjectSettings'
import DMS from './dms/DMS'
import { startFetchProject } from '../../actions/projectActions'
import Page from '../../elements/Page'

function Projects({ match, match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startFetchProject(project_id))
  }, [dispatch, project_id])

  return (
    <Switch>
      <Page
        path={`${match.path}/documents`}
        component={DMS}
      />
      <Page
        title='Project settings'
        path={`${match.path}`}
        component={ProjectSettings}
      />
    </Switch>
  )
}


export default withRouter(Projects)
