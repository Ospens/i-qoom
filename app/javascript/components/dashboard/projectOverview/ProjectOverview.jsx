import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import WelcomeModal from './Welcome'
import ModalCreateProject from './ModalCreateProject'
import { startFetchProjects, exitProject } from '../../../actions/projectActions'

const ProjectOverview = () => {
  const dispatch = useDispatch()
  const fetchProjects = useCallback(() => 
    dispatch(startFetchProjects()),
    [dispatch]
  )
  const exit = useCallback(() =>
    dispatch(exitProject()),
    [dispatch],
  )
  
  useEffect(() => {
    fetchProjects()
    exit()
  }, [])
  const allProjects = useSelector(state => state.projects.allProjects)
  
  return (
    <div>
      <div className='row row-projects'>
        {allProjects.map(project => (
          <div className='col-sm-4' key={project.id}>
            <div className='project-card in-preparation'>
              <Link to={`/dashboard/projects/${project.id}`}>
                <i className='svg-icon cogs-icon' />
              </Link>
              <label>{project.name}</label>
              <div className='row project-card__bottom'>
                <div className='col-3'>
                  Planning
                  </div>
                <div className='col-3'>
                  Development
                  </div>
                <div className='col-3'>
                  Execution
                  </div>
                <div className='col-3'>
                  Operation
                  </div>
              </div>
            </div>
          </div>
        ))}
        {allProjects.length < 4 && [...Array(3 - allProjects.length)].map((_, i) => (
          <ModalCreateProject key={i} />
        ))}
      </div>
      <div className='statuses'>
        <label>Status</label>
        <ul>
          <li>
            <span className='green-dot' />
            <span>Active</span>
          </li>
          <li>
            <span className='yellow-dot' />
            <span>In Preparation</span>
          </li>
        </ul>
      </div>
      <WelcomeModal />
    </div>
  )
}

export default ProjectOverview
