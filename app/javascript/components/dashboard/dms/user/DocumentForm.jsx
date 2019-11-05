import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { startEditDocument, startUpdateDocument, newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import { dmsUsers } from '../../../../actions/projectActions'
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
  const documentFields = useSelector(state => state.documents.current)
  const dispatch = useDispatch()

  const submitDocument = useCallback(values => {
    if (step === 1) return toggleStep(2)

    return document_id
      ? dispatch(startUpdateDocument(document_id, values))
      : dispatch(startCreateDocument(project_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }, [dispatch, step])

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
      console.log(documentFields)
      initialize({ ...documentFields, ...newFields })
    }
  }, [document_id, documentFields])

  return (
    <DMSLayout
      sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
      content={renderForm(handleSubmit(submitDocument), step, () => toggleStep(1))}
    />
  )
}

export default reduxForm({ form: 'document_form' })(withRouter(DocumentForm))
