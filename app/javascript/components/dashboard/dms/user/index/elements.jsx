
import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import DropDown from '../../../../../elements/DropDown'
import { actionDDitems } from '../../constants'

export function items(icon, name, link) {
  const content = (
    <React.Fragment>
      <div className='icon-container'>
        <i className={classnames('svg-icon gray', icon)} />
      </div>
      <span className='item-text'>{name}</span>
    </React.Fragment>
  )

  return (
    <li className='dropdown-item'>
      {link
        ? <Link className='d-flex' to={link}>{content}</Link>
        : content}
    </li>
  )
}

export function DropDownItems({ projectId, id, downloadFiles, formats, toggleFormats }) {

  return (
    <React.Fragment>
      {actionDDitems(projectId, id).map(({ icon, title, link }, i) => (
        <React.Fragment key={i}>
          {items(icon, title, link)}
        </React.Fragment>
      ))}
      {formats && 
      <li className='dropdown-item'>
        <DropDown
          className='dropdown-submenu show'
          btnClass='dropdown-submenu'
          btnComponent={
            <React.Fragment>
              <div className='icon-container'>
                <i className='svg-icon download-icon gray' />
              </div>
              <span className='item-text'>
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
                  id='csv'
                  checked={formats && formats.includes('csv')}
                  onChange={() => toggleFormats('csv')}
                />
                <label htmlFor='csv' />
                <i className='svg-icon file-csv-icon' />
                <span>CSV</span>
              </div>
              <div className='col-6'>
                <input
                  type='checkbox'
                  id='xlsx'
                  checked={formats && formats.includes('xlsx')}
                  onChange={() => toggleFormats('xlsx')}
                />
                <label htmlFor='xlsx' />
                <i className='svg-icon file-xls-icon' />
                <span>XLS</span>
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col-6'>
                <input
                  type='checkbox'
                  id='xml'
                  checked={formats && formats.includes('xml')}
                  onChange={() => toggleFormats('xml')}
                />
                <label htmlFor='xml' />
                <i className='svg-icon file-xml-icon' />
                <span>XML</span>
              </div>
              <div className='col-6'>
                <input
                  type='checkbox'
                  id='pdf'
                  checked={formats && formats.includes('pdf')}
                  onChange={() => toggleFormats('pdf')}
                />
                <label htmlFor='pdf' />
                <i className='svg-icon file-pdf-icon' />
                <span>PDF</span>
              </div>
            </div>
            <div className='button-block'>
              <button type='button' className='btn btn-white cancel-button'>Cancel</button>
              <button 
                type='button'
                onClick={downloadFiles}
                className='btn btn-white-blue'
                disabled={formats.length < 1}
              >
                Download files
              </button>
            </div>
          </div>
        </DropDown>
      </li>}
    </React.Fragment>
  )
}