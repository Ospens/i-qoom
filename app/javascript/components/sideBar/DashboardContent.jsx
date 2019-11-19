import React from 'react'
import SideBarItem from './SideBarItem'

function DashboardContent() {
  return (
    <ul className='nav flex-column nav-items'>
      <li className='nav-item'>
        <span className='sidebar_section-title'>Frequently used</span>
      </li>
      <SideBarItem path='/dashboard/' label='Project overview' />
    </ul>
  )
}

export default DashboardContent
