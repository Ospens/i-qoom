import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import WelcomeModal from './Welcome'
import ModalCreateProject from './ModalCreateProject'
import { startFetchProjects, exitProject } from '../../../actions/projectActions'

const ProjectOverview = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startFetchProjects())
    dispatch(exitProject())
  }, [dispatch])
  const allProjects = useSelector(state => state.projects.allProjects)

  return (
    <div>
      <div className="row-projects">
        {allProjects.map(project => {
          let href = '#'
          if (project.dms_module_access || project.dms_module_master) {
            href = `/dashboard/projects/${project.id}/documents`
          }
          return (
            <div className="project-card in-preparation" key={project.id}>
              {project.isAdmin
                ? (
                  <Link to={`/dashboard/projects/${project.id}`}>
                    <span className="icon-cog-double-2" />
                  </Link>
                )
                : <div />}
              <div className="project-title">
                <Link to={href}>
                  {project.name}
                </Link>
              </div>
              <div className="row project-card__bottom">
                <div className="col-3">
                  Planning
                </div>
                <div className="col-3">
                  Development
                </div>
                <div className="col-3">
                  Execution
                </div>
                <div className="col-3">
                  Operation
                </div>
              </div>
            </div>
          )
        })}
        {allProjects.length < 4 && [...Array(3 - allProjects.length)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ModalCreateProject key={i} />
        ))}
      </div>
      <div className="statuses">
        <label>Status</label>
        <ul>
          <li>
            <span className="green-dot" />
            <span>Active</span>
          </li>
          <li>
            <span className="yellow-dot" />
            <span>In Preparation</span>
          </li>
        </ul>
      </div>
      <WelcomeModal />
    </div>
  )
}

export default ProjectOverview
