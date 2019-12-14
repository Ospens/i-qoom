import React, { useState } from 'react'
import classnames from 'classnames'
import DropDown from '../../../../../elements/DropDown'
import DocumentPopup from '../../DocumentPopup'
import { reviewStatuses } from '../../constants'
import DmsSideBar from '../../sideBar/DmsSideBar'
import Folders from '../../sideBar/Folders'
import { DropDownItems } from './elements'

function SideBar({ projectId, checkedDocs, popup }) {
  const [myReview, toggleMyReview] = useState(false)
  const [allReview, toggleAllReview] = useState(false)
  const allReviewClass = classnames({ hidden: !allReview })
  const myReviewClass = classnames({ hidden: !myReview })

  return (
    <DmsSideBar>
      {popup && <DocumentPopup closePopup={() => console.log('')} />}
      <div className="dms-sidebar-menu__block">
        {checkedDocs.length !== 0
          ? (
            <div className="selected-info-block">
              <span>{checkedDocs.length}</span>
              <span>selected Doc</span>
            </div>
          )
          : <h4>Actions</h4>}
        <DropDown
          btnName="Action"
          className="dms-sidebar-menu__dropdown"
        >
          <DropDownItems projectId={projectId} toggleFormats={() => console.log('')} />
        </DropDown>
      </div>

      <Folders />
      <div className="dms-sidebar-menu__block">
        <h4>Review process</h4>
        <div className="dms-sidebar-menu__reviews-list">
          <div className="dms-sidebar-menu__reviews-button">
            <i className="arrow down" />
            <button
              type="button"
              className="ml-2 btn p-0"
              onClick={() => toggleMyReview(!myReview)}
            >
              My review (owned)
            </button>
            <div className="red-rounded-info">3</div>
          </div>
          <ul className={myReviewClass}>
            {reviewStatuses.map(({ title, color, count }) => (
              <li className="dms-sidebar-menu__item" key={title}>
                <span className={`${color}-dot`} />
                <span className="status-name">{title}</span>
                <span className="dms-sidebar-menu__item_count">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dms-sidebar-menu__reviews-list">
          <div className="dms-sidebar-menu__reviews-button">
            <i className="arrow down" />
            <button
              type="button"
              className="ml-2 btn p-0"
              onClick={() => toggleAllReview(!allReview)}
            >
              All review
            </button>
            <div className="red-rounded-info">1</div>
          </div>
          <ul className={allReviewClass}>
            {reviewStatuses.map(({ title, color, count }) => (
              <li className="dms-sidebar-menu__item" key={title}>
                <span className={`${color}-dot`} />
                <span className="status-name">{title}</span>
                <span className="dms-sidebar-menu__item_count">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DmsSideBar>
  )
}

export default SideBar
