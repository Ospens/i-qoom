import React, { useCallback, useState } from 'react'
import DropDown from '../../../../../elements/DropDown'
import toggleArray from '../../../../../elements/toggleArray'

function DownloadDocuments({ docId, downloadByOption }) {
  const [types, setTypes] = useState([])

  const toggleTypes = useCallback((checked, value) => {
    setTypes(toggleArray(checked, value))
  }, [types])

  return (
    <DropDown
      className='dropdown-submenu show'
      btnClass='dropdown-submenu'
      btnComponent={<span className='icon-common-file-text-download black' />}
    >
      <div className='download-files-dropdown'>
        <div className='download-files-dropdown__title'>
          <span>Download</span>
        </div>
        <div className='download-files-dropdown__list'>
          <div className='download-files-dropdown__list_item'>
            <input
              type='checkbox'
              checked={types.includes('native')}
              id={`download_native_file_${docId}`}
              onChange={() => toggleTypes(types, 'native')}
            />
            <label htmlFor={`download_native_file_${docId}`} />
            <label htmlFor={`download_native_file_${docId}`} className='label-with-icon'>
              <span className='icon-common-file-text_big mx-2'>
                <span className='path1' />
                <span className='path2' />
                <span className='path3' />
                <span className='path4' />
              </span>
              Native file title
            </label>
          </div>
          <div className='download-files-dropdown__list_item'>
            <input
              type='checkbox'
              checked={types.includes('details')}
              id={`download_details_${docId}`}
              onChange={() => toggleTypes(types, 'details')}
            />
            <label htmlFor={`download_details_${docId}`} />
            <label htmlFor={`download_details_${docId}`} className='label-with-icon'>
              <span className='icon-common-file-text-download mx-2' />
              Download details
            </label>
          </div>
        </div>
        <div className='button-block'>
          <button type='button' className='btn btn-white cancel-button'>Cancel</button>
          <button
            type='button'
            onClick={() => {
              downloadByOption(types)
              setTypes([])
            }}
            disabled={types.length < 1}
            className='btn btn-white-blue'
          >
            Download files
          </button>
        </div>
      </div>
    </DropDown>
  )
}

export default DownloadDocuments
