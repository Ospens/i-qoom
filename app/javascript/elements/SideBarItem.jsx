import React from 'react'
import {
  Link,
  Route
} from 'react-router-dom'

const SideBarItem = ({
  path,
  label
}) => (
  <Route path={path} exact>
    {({ match }) => (
      <li className={`nav-item ${match ? 'active' : ''}`}>
        <Link className="nav-link" to={path}>
          {label}
        </Link>
      </li>
    )}
  </Route>
)

export default SideBarItem
