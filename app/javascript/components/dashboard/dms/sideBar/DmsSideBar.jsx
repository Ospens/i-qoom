import React from 'react'
import { Link, useParams } from 'react-router-dom'
import MainItems from './MainItems'

export const DmsSideBar = ({ children }) => {
  const { project_id } = useParams()
  
  return (
    <React.Fragment>
      <div className='dms-sidebar-menu'>
        <MainItems />

        {children}

        <Link to={`/dashboard/projects/${project_id}`} className='btn-back-to-prev-page'>
          <span className='icon-Arrow_2_left mr-2'><span className='path1'></span><span className='path2'></span></span>
          BACK
        </Link>
      </div>
    </React.Fragment>
  )
}

export default DmsSideBar
