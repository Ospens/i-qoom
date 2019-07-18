import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import projectsIcon from '../../images/streamline-icon-folder-file'
import calendarIcon from '../../images/streamline-icon-calendar-1'
import timeSheetIcon from '../../images/streamline-icon-stopwatch'
import taskListIcon from '../../images/streamline-icon-task-list-edit'
import resourcePlanningIcon from '../../images/streamline-icon-module-hand-puzzle'
import { startFetchProjects } from '../../actions/projectActions'
import blueCheck from '../../images/add_1'

const menuListFirstRow = [
  {
    title: undefined,
    img: undefined,
  },
  {
    title: 'Time Sheet',
    img: timeSheetIcon,
  },
  {
    title: 'Task List',
    img: taskListIcon,
  },
  {
    title: 'Resource Planning',
    img: resourcePlanningIcon
  },
  {
    title: 'Calendar',
    img: calendarIcon
  }
]

class LandingMenu extends Component {

  state = { 
    projectsOpen: false
  }

  componentWillMount() {
    const { startFetchProjects } = this.props
    startFetchProjects()
  }

  renderCardContent = (project, i) => {
    if (project.id === 0) {
      return (
        <Link to={`/dashboard/`}>
          <div className='landing-card__title-block'>
            <span>New project</span>
            <div className='d-flex justify-content-center'>
              <ReactSVG
                svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                src={blueCheck}
              />
              <p className='new-project'>Add project</p>
            </div>
          </div>
        </Link>
      )
    } else {
      return (
        <Link to={`/dashboard/projects/${project.id}`}>
          <div className='landing-card__title-block'>
            <span>{`Project ${i + 1}:`}</span>
            <p>{project.name}</p>
          </div>
        </Link>
      )
    }
}

  renderRootMenu = (projectsOpen, list) => {
    const contentClass = classnames('landing-menu__card-content', { 'disable': !projectsOpen })
    const mainContentClass = classnames('landing-menu__card-content', { 'disable': projectsOpen })

    return (
      list.map(({ title, img, project }, i) => (
        <div className='landing-menu__card' key={i}>
          <div className={mainContentClass}>
            <div className='landing-card__title-block'>
              {img && 
                <React.Fragment>
                  <span>{title}</span>
                  <ReactSVG
                    src={img}
                    svgStyle={{ height: 40, width: 50 }}
                    className='landing-menu__card-content__icon'
                  />
                </React.Fragment>
              }
            </div>
          </div>
          <div className={contentClass}>
            {project && this.renderCardContent(project, i)}
          </div>
        </div>
      ))
    )
  }

  render() {
    const { projectsOpen } = this.state
    const { projects } = this.props
    const projectCardClass = classnames('landing-menu__card landing-project-card', { 'open': projectsOpen })
    // TODO: change this
    const prjlength = projects.length > 3 ? 3 : projects.length
    projects.slice(0, 4).map((el, i) => (
      menuListFirstRow[i]['project'] = el
    ))
    {[...Array(3 - prjlength)].map((_, i) => (
      menuListFirstRow[i + prjlength]['project'] = { id: 0 }
    ))}

    return (
      <section className='container info-container text-center'>
        <h2>Which area would you like to enter?</h2>
        <div className='landing-menu'>
          <div className={projectCardClass} onClick={() => this.setState({ projectsOpen: !projectsOpen })}>
            <div className='landing-menu__card-content'>
              <div className='landing-card__title-block'>
                <span>Projects</span>
                <ReactSVG
                  src={projectsIcon}
                  svgStyle={{ height: 40, width: 50 }}
                  className='landing-menu__card-content__icon'
                />
              </div>
            </div>
          </div>
          {this.renderRootMenu(projectsOpen, menuListFirstRow.slice(0, 3))}
          <div className='landing-menu__card' />
        </div>
        <div className='landing-menu'>
          <div className='landing-menu__card disable' />
          {this.renderRootMenu(projectsOpen, menuListFirstRow.slice(3, 7))}
          <div className='landing-menu__card' />
          <div className='landing-menu__card' />
        </div>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProjects: () => dispatch(startFetchProjects())
})

const mapStateToProps = ({ projects }) => ({
  projects: projects.allProjects
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingMenu)