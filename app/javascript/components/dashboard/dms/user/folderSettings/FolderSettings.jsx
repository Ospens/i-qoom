import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFormValues } from 'redux-form'
import { withRouter } from 'react-router-dom'
import { startEditFolder } from '../../../../../actions/foldersActions'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import FolderForm from './FolderForm'

const infoValue = (fields, kind) => fields ? fields.find(f => f.codification_kind === kind).value || '___' : '___'

function FolderSettingsTable(fields) {
  return (
    <div className='content-body'>
      <h5>Document code</h5>
      <div className='folder-setting-table'>
        <div className='folder-setting-table__row head-row'>
          <div>Enter code</div>
          <div>Copied automatically</div>
        </div>
        <div className='folder-setting-table__row'>
          <FolderForm/>
          <div className='copied-automatically-code'>
            {fields
              ? `ABC-${infoValue(fields, 'originating_company')}-${infoValue(fields, 'discipline')}-${infoValue(fields, 'document_type')}-${infoValue(fields, 'document_number')}`
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
  const formValues = useSelector(state => getFormValues('folder_form')(state)) || {}
  const fields = formValues.document_fields

  return (
    <div className='dms-content bordered'>
      <div className='dms-content__header folder_edit'>
        <div>
          <h4>Folder Settings</h4>
          {folderId && <label>{`Manage '${formValues.title}'`}</label>}
        </div>
        {folderId && <div className='dms-content__header folder-info'>
          Copy every document automatically with entered code to selected folder     
        </div>}
        {folderId && <div>
          <div><label>Examples</label></div>
          <div><label>ABC-DEF-FGH-IJK-1234</label></div>
          <div><label>ABC-DEF-FGH-___-____</label></div>
          <div><label>ABC-___-___-IJK-____</label></div>
        </div>}
      </div>
      {folderId ? FolderSettingsTable(fields) : NoOptions()}
    </div>
  )
}

function FolderSettings({ match: { params: { folder_id } } }) {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!folder_id) return
    
    dispatch(startEditFolder(folder_id))
  }, [dispatch, folder_id])

  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={Content(folder_id)}
    />
  )
}

export default withRouter(FolderSettings)
