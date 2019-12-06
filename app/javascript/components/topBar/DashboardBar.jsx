import React from 'react'
import { useSelector } from 'react-redux'
import UserOptions from './UserOptions'

function DashboardBar({ isOpen, toggle }) {
  const header = useSelector(({ projects }) => projects.title)
  return (
    <div className="top-bar-user-info">
      {!isOpen
        && (
          <div className="navbar-burger-block">
            <h2>
              <button type="button" className="mr-5" onClick={toggle}>
                <i className="icon-Burgermenu_2" />
              </button>
            </h2>
          </div>
        )}
      {header}
      <UserOptions isLanding={false} />
    </div>
  )
}
export default DashboardBar
