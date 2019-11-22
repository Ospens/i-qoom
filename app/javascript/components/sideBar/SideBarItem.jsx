import React from 'react'
import {
  Link,
  Route
} from 'react-router-dom'
import classnames from 'classnames'

const linkClass = (match, location, root) => {
  const matched = match ? true : location.pathname.indexOf(root) > -1
  return classnames('nav-item', { 'active': matched })
}

const SideBarItem = ({ path, label, root }) => (
  <Route path={path} exact>
    {({ match, location }) => (
      <li className={linkClass(match, location, root)}>
        <Link className='nav-link' to={path}>
          {label}
        </Link>
      </li>
    )}
  </Route>
)

export default SideBarItem
