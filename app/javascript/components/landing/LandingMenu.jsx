import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { startFetchProjects } from '../../actions/projectActions'

const menuListFirstRow = [
  {
    title: undefined,
    icon: undefined
  },
  {
    title: 'Time Sheet',
    icon: 'icon-streamline-icon-stopwatch24x24'
  },
  {
    title: 'Task List',
    icon: 'icon-streamline-icon-task-list-edit24x24'
  },
  {
    title: 'Resource Planning',
    icon: 'icon-streamline-icon-module-hand-puzzle24x24'
  },
  {
    title: 'Calendar',
    icon: 'icon-streamline-icon-calendar-124x24'
  }
]

function CardContent({ project, i }) {
  if (project.id === 0) {
    return (
      <Link to="/dashboard/">
        <div className="landing-card__title-block">
          <span>New project</span>
          <div className="new-project">
            <span className="icon-add_1 mr-2" />
            Add project
          </div>
        </div>
      </Link>
    )
  }
  return (
    <Link to={`/dashboard/projects/${project.id}`}>
      <div className="landing-card__title-block">
        <span>{`Project ${i + 1}:`}</span>
        <p>{project.name}</p>
      </div>
    </Link>
  )
}

function RootMenu({ open, list }) {
  const contentClass = classnames('landing-menu__card-content', { disable: !open })
  const mainContentClass = classnames('landing-menu__card-content', { disable: open })

  return (
    list.map(({ title, icon, project }, i) => (
      <div className="landing-menu__card" key={i}>
        <div className={mainContentClass}>
          <div className="landing-card__title-block">
            {icon
              && (
                <React.Fragment>
                  <span>{title}</span>
                  <span className={icon} />
                </React.Fragment>
              )}
          </div>
        </div>
        <div className={contentClass}>
          {project && <CardContent project={project} i={i} />}
        </div>
      </div>
    ))
  )
}

function LandingMenu() {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.allProjects)
  const [open, setOpen] = useState(false)
  const projectCardClass = classnames('landing-menu__card landing-project-card', { open })

  useEffect(() => {
    const prjlength = projects.length > 3 ? 3 : projects.length
    projects.slice(0, 4).map((el, i) => (
      menuListFirstRow[i].project = el
    ))
    { [...Array(3 - prjlength)].forEach((_, i) => { menuListFirstRow[i + prjlength].project = { id: 0 } }) }
  }, [projects])

  useEffect(() => {
    dispatch(startFetchProjects())
  }, [dispatch])

  return (
    <div className="landing-page">
      <section className="container info-container text-center">
        <h2>Which area would you like to enter?</h2>
        <div className="landing-menu">
          <div className={projectCardClass} onClick={() => setOpen(!open)}>
            <div className="landing-menu__card-content">
              <div className="landing-card__title-block">
                <span>Projects</span>
                <span className="icon-streamline-icon-folder-file24x24" />
              </div>
            </div>
          </div>
          <RootMenu open={open} list={menuListFirstRow.slice(0, 3)} />
          <div className="landing-menu__card" />
        </div>
        <div className="landing-menu">
          <div className="landing-menu__card disable" />
          <RootMenu open={open} list={menuListFirstRow.slice(3, 7)} />
          <div className="landing-menu__card" />
          <div className="landing-menu__card" />
        </div>
      </section>
    </div>
  )
}

export default LandingMenu
