import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './Dashboard.scss'
import logo from '../../images/Logo_header'

class SideBar extends Component {

  render() {
    return (
      <nav className='col-md-2 d-none d-md-block sidebar'>
        <div className='sidebar-sticky'>
          <a className='navbar-brand logo_h' href='#'>
            <ReactSVG
              svgStyle={{ height: 30, width: 100 }}
              src={logo}
            />
          </a>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <a className='nav-link active'>Project ovreview</a>
              <Link to="/dashboard/test">Home</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default SideBar
