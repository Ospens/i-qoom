import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import { startEditDocument, startUpdateDocument } from '../../../../actions/documentsActions'
import DMSLayout from '../DMSLayout'
import DocumentSideBar from './DocumentSideBar'
import DocumentsAndFiles from './DocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'

const renderForm = (handleSubmit, step, backStep) => (
  <form noValidate={true} className='dms-content bordered' onSubmit={handleSubmit}>
    {step === 1
      ? <DocumentsAndFiles />
      : <AccessAndCommunication backStep={backStep} />}
  </form>
)

function DocumentForm({ initialize, handleSubmit, history, match: { params: { project_id, document_id } } }) {
  const [step, toggleStep] = useState(1)
  const documentFields = useSelector(state => state.documents.documentFields)
  const dispatch = useDispatch()

  const sendData = useCallback(values =>
    document_id
      ? dispatch(startUpdateDocument(document_id, values))
      : dispatch(startCreateDocument(project_id, values)),
    [dispatch])

  const getDocumentData = useCallback(() =>
    document_id
      ? dispatch(startEditDocument(document_id))
      : dispatch(newDocument(project_id)),
    [dispatch])

  useEffect(() => { getDocumentData()}, [])

  useEffect(() => { initialize({ ...documentFields }) }, [documentFields])

  const submitDocument = values => {
    if (step === 1) return toggleStep(2)
    
    return sendData(values)
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }

  return (
    <DMSLayout
      sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
      content={renderForm(handleSubmit(submitDocument), step, () => toggleStep(1))}
    />
  )
}

export default reduxForm({ form: 'document_form' })(withRouter(DocumentForm))
