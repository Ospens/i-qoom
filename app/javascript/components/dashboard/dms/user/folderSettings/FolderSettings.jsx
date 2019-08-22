import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  formValueSelector,
} from 'redux-form'
import { withRouter } from 'react-router-dom'
import { startEditFolder } from '../../../../../actions/foldersActions'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import FolderForm from './FolderForm'

const selector = formValueSelector('folder_form')

function FolderSettingsTable() {
  const documentFields = useSelector(state => selector(state, 'document_fields'))

  return (
    <div className='p-4'>
      <h5>Document code</h5>
      <div className='folder-setting-table'>
        <div className='folder-setting-table__row head-row'>
          <div>Enter code</div>
          <div>Copied automatically</div>
        </div>
        <div className='folder-setting-table__row'>
          <FolderForm/>
          <div className='copied-automatically-code'>
            {documentFields
              ? 'ABC-___-___-IJK-____'
              : '___-___-___-___-____' 
            }
            </div>
        </div>
      </div>
    </div>
  )
}

const NoOptions = () => (
  <div className='p-4 folder_edit__no-options'>
    <div>No options for "All documents"</div>
    <div>All documents you have access to are copied to this folder</div>  
  </div>
)

function Content(folderId) {
  const folder = useSelector(state => state.folders.editing)

  return (
    <div className='dms-content bordered'>
      <div className='dms-content__header folder_edit'>
        <div>
          <h4>Folder Settings</h4>
          <label>{`Manage '${folder.title}'`}</label>
        </div>
        <div className='dms-content__header folder-info'>
          Copy every document automatically with entered code to selected folder     
        </div>
        <div>
          <div><label>Examples</label></div>
          <div><label>ABC-DEF-FGH-IJK-1234</label></div>
          <div><label>ABC-DEF-FGH-___-____</label></div>
          <div><label>ABC-___-___-IJK-____</label></div>
        </div>
      </div>
      {folderId ? FolderSettingsTable() : NoOptions()}
    </div>
  )
}

function FolderSettings({ match: { params: { folder_id } } }) {
  const dispatch = useDispatch()

  const getFolder = useCallback(() => {
    dispatch(startEditFolder(folder_id))
  }, [dispatch])

  useEffect(() => { if (folder_id) getFolder() }, [])

  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={Content(folder_id)}
    />
  )
}

export default withRouter(FolderSettings)
