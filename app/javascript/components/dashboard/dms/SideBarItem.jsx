import React from 'react'
import { Link, Route } from 'react-router-dom'
import ReactSVG from 'react-svg'

const SideBarItem = ({ path, label, icon }) => (
  <Route path={path} exact>
    {({ match }) => (
      <li className='dms-sidebar-menu__item'>
        <Link className={`btn ${match ? '#active' : ''}`} to={path}>
          <ReactSVG
            svgStyle={{ height: 20, width: 20, marginRight: 10 }}
            src={icon}
          />
          <span className='head-button__gray-text'>{label}</span>
        </Link>
      </li>
    )}
  </Route>
)

export default SideBarItem