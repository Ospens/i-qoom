import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { startFetchProjects } from '../../actions/projectActions'

const menuListFirstRow = [
  {
    title: undefined,
    icon: undefined,
  },
  {
    title: 'Time Sheet',
    icon: 'icon-streamline-icon-stopwatch24x24',
  },
  {
    title: 'Task List',
    icon: 'icon-streamline-icon-task-list-edit24x24',
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
            <div className='new-project'>
              <span className='icon-add_1 mr-2' />
              Add project
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
      list.map(({ title, icon, project }, i) => (
        <div className='landing-menu__card' key={i}>
          <div className={mainContentClass}>
            <div className='landing-card__title-block'>
              {icon && 
              <React.Fragment>
                <span>{title}</span>
                <span className={icon} />
              </React.Fragment> }
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
      <div className='landing-page'>
        <section className='container info-container text-center'>
          <h2>Which area would you like to enter?</h2>
          <div className='landing-menu'>
            <div className={projectCardClass} onClick={() => this.setState({ projectsOpen: !projectsOpen })}>
              <div className='landing-menu__card-content'>
                <div className='landing-card__title-block'>
                  <span>Projects</span>
                  <span className='icon-streamline-icon-folder-file24x24' />
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
      </div>
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