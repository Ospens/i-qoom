import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import DropDown from '../../../elements/DropDown'
import xlsIcon from '../../../images/office-file-xls'
import xmlIcon from '../../../images/xml-1'
import csvIcon from '../../../images/csv-1'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'
import docPlanIcon from '../../../images/calendar-3'
import downloadDetailsIcon from '../../../images/download-button'
import pdfIcon from '../../../images/office-file-pdf'
import DocumentPopup from './DocumentPopup'
import { actionDDitems, reviewStatuses, foldersItems, SideBarItem } from './constants'

const menuItems = [
  {
    title: 'Overview',
    icon: overviewIcon,
    path: '/dashboard/documents/overview/'
  },
  {
    title: 'DMS Settings',
    icon: dmsSettingsIcon,
    path: '/dashboard/documents/settings/'
  },
  {
    title: 'Document planning',
    icon: docPlanIcon,
    path: '/dashboard/documents/planning/'
  }
]

class DmsSideBar extends Component {

  state = {
    myReview: false,
    allReview: false,
    popup: true
  }

  render() {
    const { checkedDocs, renderDropDownItems } = this.props
    const { myReview, allReview, popup } = this.state
    const allReviewulClass = classnames({ 'hidden': !allReview })
    const myReviewulClass = classnames({ 'hidden': !myReview })

    return (
      <React.Fragment>
        {popup && <DocumentPopup closePopup={() => this.setState({ popup: false })} />}
        <div className='dms-sidebar-menu'>
          <div className='dms-sidebar-menu__block'>
            <h4>DMS menu</h4>
            <ul className='dms-sidebar-menu__list'>
                {menuItems.map(({ path, title, icon }, i) => (
                <React.Fragment key={i}>
                  <SideBarItem path={path} label={title} icon={icon} />
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className='dms-sidebar-menu__block'>
            {checkedDocs.length !== 0
              ? <div className='selected-info-block'><span>{checkedDocs.length}</span> selected Doc</div>
              : <h4>Actions</h4>}
            <DropDown
              btnName='Action'
              className='dms-sidebar-menu__dropdown'
            >
              {actionDDitems.map(({ icon, title }, i) => (
                <React.Fragment key={i}>
                  {renderDropDownItems(icon, title)}
                </React.Fragment>
              ))}
              <DropDown
                className='dropdown-submenu dropdown-item show'
                btnClass='dropdown-submenu'
                btnComponent={
                  <React.Fragment>
                    <ReactSVG
                      svgStyle={{ height: 20, width: 20 }}
                      src={downloadDetailsIcon}
                    />
                    <span className='dropdown-item'>
                      Download as list
                        </span>
                  </React.Fragment>
                }
              >
                <div className='download-files-dropdown'>
                  <div className='download-files-dropdown__title'>
                    <span>Choose format</span>
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <input
                        type='checkbox'
                        id='download_csv'
                      />
                      <label htmlFor='download_csv' />
                      <ReactSVG
                        svgStyle={{ height: 20, width: 20 }}
                        src={csvIcon}
                      />
                      <span>CSV</span>
                    </div>
                    <div className='col-6'>
                      <input
                        type='checkbox'
                        id='download_xls'
                      />
                      <label htmlFor='download_xls' />
                      <ReactSVG
                        svgStyle={{ height: 20, width: 20 }}
                        src={xlsIcon}
                      />
                      <span>XLS</span>
                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='col-6'>
                      <input
                        type='checkbox'
                        id='download_xml'
                      />
                      <label htmlFor='download_xml' />
                      <ReactSVG
                        svgStyle={{ height: 20, width: 20 }}
                        src={xmlIcon}
                      />
                      <span>XML</span>
                    </div>
                    <div className='col-6'>
                      <input
                        type='checkbox'
                        id='download_pdf'
                      />
                      <label htmlFor='download_pdf' />
                      <ReactSVG
                        svgStyle={{ height: 20, width: 20 }}
                        src={pdfIcon}
                      />
                      <span>PDF</span>
                    </div>
                  </div>
                  <div className='button-block'>
                    <button type='button' className='btn btn-white'>Cancel</button>
                    <button type='button' className='btn btn-white-blue'>Download files</button>
                  </div>
                </div>
              </DropDown>
            </DropDown>
          </div>

          <div className='dms-sidebar-menu__block'>
            <h4>My Folders</h4>
            <ul className='dms-sidebar-menu__list'>
              {foldersItems.map(({ title, icon }, i) => (
                <li className='dms-sidebar-menu__item' key={i}>
                  <button type='button' className='btn'>
                    <ReactSVG
                      svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                      src={icon}
                    />
                    <span className='head-button__gray-text'>{title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='dms-sidebar-menu__block'>
            <h4>Review process</h4>
            <div className='dms-sidebar-menu__reviews-list'>
              <div className='dms-sidebar-menu__reviews-button'>
                <i className='arrow down' />
                <button
                  className='btn'
                  onClick={() => this.setState({ myReview: !myReview })}
                >
                  My review (owned)
                </button>
                <div className='red-rounded-info'>3</div>
              </div>
              <ul className={myReviewulClass}>
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
                  className='btn'
                  onClick={() => this.setState({ allReview: !allReview })}
                >
                  All review
                    </button>
                <div className='red-rounded-info'>1</div>
              </div>
              <ul className={allReviewulClass}>
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

        </div>
      </React.Fragment>
    )
  }
}
 
export default DmsSideBar