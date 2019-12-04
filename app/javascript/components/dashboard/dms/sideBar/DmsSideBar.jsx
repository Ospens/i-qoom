import React from 'react'
import { Link, useParams } from 'react-router-dom'
import MainItems from './MainItems'

const DmsSideBar = ({ children }) => {
  const { projectId } = useParams()

  return (
    <React.Fragment>
      <div className="dms-sidebar-menu">
        <MainItems />
        {children}
        <Link to={`/dashboard/projects/${projectId}`} className="btn-back-to-prev-page">
          <span className="icon-Arrow_2_left mr-2">
            <span className="path1" />
            <span className="path2" />
          </span>
          BACK
        </Link>
      </div>
    </React.Fragment>
  )
}

export default DmsSideBar
