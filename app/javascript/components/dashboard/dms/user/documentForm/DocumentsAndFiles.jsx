import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  formValueSelector,
  change,
  initialize
} from 'redux-form'
import { Link, useParams } from 'react-router-dom'
import { initValues } from '../../initDocId'
import { infoNotify } from '../../../../../actions/notificationsActions'
import UploadForm from './UploadForm'
import InputByType from './InputByType'
import formvalue from './formvalue'

const selector = formValueSelector('document_form')

function DocumentsAndFiles() {
  const [modal, toggleModal] = useState(false)
  const { projectId } = useParams()
  const documentFields = useSelector(state => selector(state, 'document_fields')) || []

  const docFile = formvalue(documentFields, 'document_native_file')
  const generateId = useSelector(state => selector(state, 'generate_id'))
  const dispatch = useDispatch()

  // Select options haven't ids

  const changeValues = useCallback((value, fieldValues, index) => {
    const newValues = fieldValues.map(field => {
      const selected = field.value === value
      return {
        ...field,
        selected
      }
    })
    dispatch(change('document_form', `document_fields[${index}].document_field_values`, newValues))
  }, [dispatch])

  const initDocIdForm = useCallback(values => {
    dispatch(initialize('doc_id_form', values))
  }, [dispatch])

  useEffect(() => {
    if (modal) {
      toggleModal(false)
      return
    }
    if (!generateId) return

    const infoMsg = title => dispatch(
      infoNotify('Documents', `Can not get data from title ${title}`)
    )

    const values = initValues(documentFields, title => infoMsg(title))
    if (!values) return

    initDocIdForm(values)
    toggleModal(true)
  }, [dispatch, docFile, documentFields, generateId, initDocIdForm, modal])
  const nativeFileIndex = documentFields
    .findIndex(f => f.codification_kind === 'document_native_file')

  return (
    <React.Fragment>
      <div className="dms-content__header">
        <h4>Add documents data & files</h4>
      </div>
      <div className="form-body">
        <UploadForm />
        {nativeFileIndex > -1 && (
          <div className="col-6 pl-0">
            <div className="form-group">
              <InputByType
                modal={modal}
                toggleModal={toggleModal}
                field={documentFields[nativeFileIndex]}
                fieldIndex={nativeFileIndex}
                changeValues={changeValues}
              />
            </div>
          </div>
        )}
      </div>

      <div className="dms-footer">
        <Link className="btn btn-white" to={`/dashboard/projects/${projectId}/documents/`}>
          Cancel
        </Link>
        <button type="submit" className="btn btn-purple">Next</button>
      </div>
    </React.Fragment>
  )
}

export default DocumentsAndFiles
