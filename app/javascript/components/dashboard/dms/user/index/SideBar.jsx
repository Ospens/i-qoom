import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import DropDown from '../../../../../elements/DropDown'
import DocumentPopup from '../../DocumentPopup'
import { reviewStatuses } from '../../constants'
import DmsSideBar from '../../DmsSideBar'
import { Folders } from '../../DmsSideBar'
import { DropDownItems } from './elements'

function SideBar({ projectId, checkedDocs, popup }) {
  const folders = useSelector(state => state.folders.allFolders)
  const [myReview, toggleMyReview] = useState(false)
  const [allReview, toggleAllReview] = useState(false)
  const allReviewlClass = classnames({ 'hidden': !allReview })
  const myReviewlClass = classnames({ 'hidden': !myReview })

  return (
    <DmsSideBar>
      {popup && <DocumentPopup closePopup={() => this.setState({ popup: false })} />}
      <div className='dms-sidebar-menu__block'>
        {checkedDocs.length !== 0
          ? <div className='selected-info-block'><span>{checkedDocs.length}</span> selected Doc</div>
          : <h4>Actions</h4>}
        <DropDown
          btnName='Action'
          className='dms-sidebar-menu__dropdown'
        >
          <DropDownItems key='sidebar_items' projectId={projectId} toggleFormats={() => console.log('sdfds')}/>
        </DropDown>
      </div>

      <Folders folders={folders} projectId={projectId} />
      <div className='dms-sidebar-menu__block'>
        <h4>Review process</h4>
        <div className='dms-sidebar-menu__reviews-list'>
          <div className='dms-sidebar-menu__reviews-button'>
            <i className='arrow down' />
            <button
              className='ml-2 btn p-0'
              onClick={() => toggleMyReview(!myReview)}
            >
              My review (owned)
            </button>
            <div className='red-rounded-info'>3</div>
          </div>
          <ul className={myReviewlClass}>
            {reviewStatuses.map(({ title, color, count }, i) => (
              <li className='dms-sidebar-menu__item' key={i}>
                <span className={`${color}-dot`} />
                <span className='status-name'>{title}</span>
                <span className='dms-sidebar-menu__item_count'>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='dms-sidebar-menu__reviews-list'>
          <div className='dms-sidebar-menu__reviews-button'>
            <i className='arrow down' />
            <button
              className='ml-2 btn p-0'
              onClick={() => toggleAllReview(!allReview)}
            >
              All review
            </button>
            <div className='red-rounded-info'>1</div>
          </div>
          <ul className={allReviewlClass}>
            {reviewStatuses.map(({ title, color, count }, i) => (
              <li className='dms-sidebar-menu__item' key={i}>
                <span className={`${color}-dot`} />
                <span className='status-name'>{title}</span>
                <span className='dms-sidebar-menu__item_count'>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DmsSideBar>
  )
}

export default SideBar