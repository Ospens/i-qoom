import React from 'react'
import { Field } from 'redux-form'
import classnames from 'classnames'
import InputField from '../../../../elements/InputField'
import FolderInfo from './FolderInfo'

const menuItems = [
  {
    title: 'Documents data & files',
    icon: 'task-checklist-icon',
    menuStep: 1
  },
  {
    title: 'Access & Communication',
    icon: 'task-list-settings-icon',
    menuStep: 2
  }
]

const DocumentSideBar = ({ step, toggleStep }) => (
  <div className='dms-sidebar-menu'>

    <div className='dms-sidebar-menu__document-title'>
      <div className='editable-title p-0'>
        <div className='form-group mb-0'>
          <Field
            component={InputField}
            name='document_name'
            id='document_name'
            label='Document name'
            placeholder='Document name'
          />
        </div>
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
              <i className={classnames('svg-icon black', icon)} />
              <span className='head-button__gray-text'>{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default DocumentSideBar
