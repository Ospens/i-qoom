import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link, useParams, useHistory
} from 'react-router-dom'
import Tabs from '../../../elements/Tabs'
import ProjectDetails from './projectDetails/ProjectDetails'
import ProjectStatus from './ProjectStatus'
import MemberManagement from './MemberManagement'
import { startEditProject } from '../../../actions/projectActions'

const renderProjectStatus = (color, text) => (
  <React.Fragment>
    <span className="green-dot" />
    <span>Project status</span>
    <span className="ml-1">
      {text}
    </span>
  </React.Fragment>
)

function ProjectSettings() {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const history = useHistory()
  const projectName = useSelector(state => state.projects.current.name)

  useEffect(() => {
    dispatch(startEditProject(projectId)).then(response => {
      if (response.status === 403) {
        history.push({ pathname: '/dashboard' })
      }
    })
  }, [dispatch, history, projectId])
  return (
    <div className="project-settings">
      <div className="project-title-editable">{projectName}</div>
      <span className="block-title mt-1">(Selected project)</span>

      <Tabs>
        <div label="Project details">
          <ProjectDetails />
        </div>
        <div label="Member management">
          <MemberManagement />
        </div>
        <div label={renderProjectStatus('color', 'active')}>
          <ProjectStatus />
        </div>
      </Tabs>

      <Link to="/dashboard" className="btn-back-to-project">
        <span className="icon-Arrow_2_left mr-2">
          <span className="path1" />
          <span className="path2" />
        </span>
        BACK TO THE PROJECT OVERVIEW
      </Link>
    </div>
  )
}

export default ProjectSettings
