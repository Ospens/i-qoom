import React from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import FolderInfo from './FolderInfo'

const selector = formValueSelector('document_form')

const menuItems = [
  {
    title: 'Documents data & files',
    icon: 'icon-task-checklist-check',
    menuStep: 1
  },
  {
    title: 'Access & Communication',
    icon: 'icon-task-list-settings',
    menuStep: 2
  }
]

const DocumentSideBar = ({ step, toggleStep }) => {
  const title = useSelector(state => selector(state, 'title'))

  return (
    <div className='dms-sidebar-menu'>

      <div className='dms-sidebar-menu__document-title'>
        <div className='editable-title'>
          <h5>{title || '(Document name)'}</h5>
          {!title && <span className='icon-common-file-edit ml-2' />}
        </div>
        <FolderInfo />
        {false && <React.Fragment>
          <div className='copied-to-folder'>
            <span>Copied to folders</span>
            <button className='btn copy-to-folder'>change</button>
          </div>
          <div className='not-relevant-for-me'>
            <span>Not relevant for me</span>
            <button className='btn copy-to-folder'>More</button>
          </div>
        </React.Fragment>}
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>DMS menu</h4>
        <ul className='dms-sidebar-menu__list'>
          {menuItems.map(({ menuStep, title, icon }, i) => (
            <li className='dms-sidebar-menu__item' key={i}>
              <button
                type='button'
                className={classnames('btn', { 'active': step === menuStep })}
                onClick={() => toggleStep(menuStep)}
              >
                <span className={classnames('black mr-2', icon)} />
                <span className='head-button__gray-text'>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DocumentSideBar
