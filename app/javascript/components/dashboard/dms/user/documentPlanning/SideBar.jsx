import React from 'react'
import DropDown from '../../../../../elements/DropDown'
import DmsSideBar from '../../DmsSideBar'

const options = [
  {
    icon: 'icon-playlist-upload',
    title: 'Use as upload template',
  },
  {
    icon: 'icon-common-file-text-download',
    title: 'Download',
  },
]

function SideBar({ checkedDocs = [], popup }) {
  return (
    <DmsSideBar>
      <div className='dms-sidebar-menu__block'>
        {checkedDocs.length !== 0
          ? <div className='selected-info-block'><span>{checkedDocs.length}</span> selected Doc</div>
          : <h4>Actions</h4>}
        <DropDown
          btnName='Action'
          className='dms-sidebar-menu__dropdown'
          defaultValues={options}
        >
        </DropDown>
      </div>
    </DmsSideBar>
  )
}

export default SideBar