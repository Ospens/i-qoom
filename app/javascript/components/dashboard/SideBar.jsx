import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { Link } from 'react-router-dom'
import './Dashboard.scss'
import logo from '../../images/Logo_header'

class SideBar extends Component {

  render() {
    return (
      <nav className='col-md-2 d-none d-md-block sidebar'>
        <div className='sidebar-sticky'>
          <Link className='navbar-brand logo_h' to="/">
            <ReactSVG
              svgStyle={{ height: 30, width: 100 }}
              src={logo}
            />
          </Link>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <Link className='nav-link active' to="/dashboard/">Project ovreview</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default SideBar
