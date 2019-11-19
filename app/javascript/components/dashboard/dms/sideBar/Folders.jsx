import React from 'react'
import CreateFolder from '../user/CreateFolder'
import DmsSideBarItem from './DmsSideBarItem'

export function Folders({ folders, projectId }) {
  return (
    <div className='dms-sidebar-menu__block'>
      <h4>My Folders</h4>
      <ul className='dms-sidebar-menu__list'>
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/my_documents`}
          label='My documents'
          icon='icon-folder-image'
        />
        <DmsSideBarItem
          path={`/dashboard/projects/${projectId}/documents/folders/all`}
          label='All documents'
          icon='icon-folder-image-1'
        />
        {folders.map(({ id, title }, i) => (
          <DmsSideBarItem
            key={i}
            path={`/dashboard/projects/${projectId}/documents/folders/${id}`}
            label={title}
            icon='icon-folder-empty'
          />
        ))}

        <CreateFolder trigger={
          <li className='dms-sidebar-menu__item add-button'>
            <button className='btn d-flex align-items-center openFolderForm' type='button'>
              <span className='icon-add_1 mr-2' />
              <span>New folder</span>
            </button>
          </li>
        }
        />
      </ul>
    </div>
  )
}

export default Folders
