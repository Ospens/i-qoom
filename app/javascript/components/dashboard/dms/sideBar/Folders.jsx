import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CreateFolder from '../user/CreateFolder'
import DmsSideBarItem from './DmsSideBarItem'

const trigger = (
  <li className="dms-sidebar-menu__item add-button">
    <button className="btn d-flex align-items-center openFolderForm" type="button">
      <span className="icon-add_1 mr-2" />
      <span>New folder</span>
    </button>
  </li>
)

function Folders() {
  const { projectId } = useParams()
  const allFolders = useSelector(({ folders }) => folders.allFolders)

  return (
    <div className="dms-sidebar-menu__block">
      <h4>My Folders</h4>
      <ul className="dms-sidebar-menu__list">
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/my_documents`}
          label="My documents"
          icon="icon-folder-image"
        />
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/all`}
          label="All documents"
          icon="icon-folder-image-1"
        />
        {allFolders.map(({ id, title }) => (
          <DmsSideBarItem
            key={id}
            path={`/dashboard/projects/${projectId}/documents/folders/${id}`}
            label={title}
            icon="icon-folder-empty"
          />
        ))}
        <CreateFolder trigger={trigger} />
      </ul>
    </div>
  )
}

export default Folders
