import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import {
  startEditDocument,
  startUpdateDocument,
  startCreateRevision,
  newDocument,
  startCreateDocument
} from '../../../../../actions/documentsActions'
import { dmsUsers } from '../../../../../actions/projectActions'
import DMSLayout from '../../DMSLayout'
import DocumentSideBar from '../DocumentSideBar'
import DocumentsAndFiles from './DocumentsAndFiles'
import UploadFile from './UploadFile'
import AccessAndCommunication from './AccessAndCommunication'

function Content({ handleSubmit, step, backStep, revision }) {
  return (
    <form noValidate={true} className='dms-content bordered' onSubmit={handleSubmit}>
      {step === 1
        ? revision
          ? <UploadFile />
          : <DocumentsAndFiles />
        : <AccessAndCommunication backStep={backStep} />}
    </form>
  )
}

function DocumentForm({ initialize, handleSubmit }) {
  const { document_id, project_id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { path } = useRouteMatch()
  const revision = path.includes('add_revision')
  const [step, toggleStep] = useState(1)
  const documentFields = useSelector(state => state.documents.current)

  const submitDocument = useCallback(values => {
    if (step === 1) return toggleStep(2)
    
    if (revision) {
      return dispatch(startCreateRevision(document_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` })) 
    }

    return document_id
      ? dispatch(startUpdateDocument(document_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` })) 
      : dispatch(startCreateDocument(project_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }, [dispatch, step, revision])

  useEffect(() => {
    document_id
      ? dispatch(startEditDocument(document_id))
      : dispatch(newDocument(project_id))
    dispatch(dmsUsers(project_id))
  }, [dispatch, project_id, document_id])

  useEffect(() => {
    if (document_id) {
      initialize({ ...documentFields })
    } else {
      const newFields = documentFields.document_fields.map(df => {
        if (df.codification_kind === 'revision_number') {
          df.value = '00'
        } else if (df.codification_kind === 'document_number') {
          df.value = '0000'
        }
        return df
      })
      initialize({ ...documentFields, ...newFields })
    }
  }, [document_id, documentFields])

  return (
    <DMSLayout
      sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
      content={<Content
        handleSubmit={handleSubmit(submitDocument)}
        step={step} 
        revision={revision} 
        backStep={() => toggleStep(1)}
      />}
    />
  )
}

export default reduxForm({ form: 'document_form' })(DocumentForm)
