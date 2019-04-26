import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import logo from '../../images/Logo_header'
import cogs from '../../images/cog-double'
import burgerOpen from '../../images/Burgermenu_1'

class SideBar extends Component {

  state = {
    open: true
  }

  render() {
    const { open } = this.state
    const mainClass = classnames('sidebar', { 'is-visible': open })
    return (
      <aside className={mainClass}>
        <div className='sidebar-sticky'>
          <div className='side-bar-logo'>
            <Link to='/'>
              <ReactSVG
                svgStyle={{ height: 30, width: 100 }}
                src={logo}
              />
            </Link>
            <ReactSVG
              svgStyle={{ height: 10, marginLeft: 20 }}
              src={burgerOpen}
              onClick={() => this.setState({ open: !open})}
            />
          </div>
          <ul className='nav flex-column nav-items'>
            <li className='nav-item'>
              <span className='light-grey'>Frequently used</span>
            </li>
            <li className='nav-item active'>
              <Link className='nav-link' to='/dashboard/'>Project overview</Link>
            </li>
          </ul>
        </div>
        <div className='active-project'>
          <div className='project-description'>
            <span className='active-project-text'>Active project</span>
            <span className='active-project-title'>Project name</span>
          </div>
          <ReactSVG
            svgStyle={{ height: 20 }}
            src={cogs}
            className='active-project-cogs'
          />
        </div>
      </aside>
    )
  }
}

export default SideBar
