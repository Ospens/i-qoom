
import React from 'react'
import DropDown, { defaultItems } from '../../../../../elements/DropDown'
import { actionDDitems } from '../../constants'

export function DropDownItems({ projectId, id, downloadFiles, formats, toggleFormats }) {
  return (
    <React.Fragment>
      {defaultItems(actionDDitems(projectId, id))}
      {formats && 
      <li className='dropdown-item'>
        <DropDown
          className='dropdown-submenu show'
          btnClass='dropdown-submenu'
          btnComponent={
            <React.Fragment>
              <div className='icon-container'>
                <span className='icon-download-button gray' />
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
                <span className='icon-csv-1' />
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
                <span className='icon-office-file-xls black' />
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
                <span className='icon-xml-1' />
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
                <span className='icon-Work-Office-Companies---Office-Files---office-file-pdf' />
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