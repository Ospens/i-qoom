import React from 'react'
import { useSelector } from 'react-redux'
import UserOptions from './UserOptions'

function DashboardBar({ isOpen, toggle }) {
  const header = useSelector(({ projects }) => projects.title)

  return (
    <div className='top-bar-user-info'>
      {!isOpen &&
        <div className='navbar-burger-block'>
          <h2>
            <i className='icon-Burgermenu_2 mr-5' onClick={toggle} />
          </h2>
        </div>}
      {header}
      <UserOptions isLanding={false} />
    </div>
  )
}
export default DashboardBar
