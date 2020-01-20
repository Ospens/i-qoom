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

function Content({ submitDocument, submitEvent, handleSubmit, step, backStep, isRevisionForm }) {
  return (
    <form noValidate={true} className='dms-content bordered' onSubmit={handleSubmit}>
      {step === 1
        ? isRevisionForm
          ? <UploadFile />
          : <DocumentsAndFiles />
        : <AccessAndCommunication
            backStep={backStep}
            handleSubmit={submitEvent}
            onSubmit={submitDocument}
          />}
    </form>
  )
}

function DocumentForm({ initialize, handleSubmit }) {
  const { document_id, projectId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { path } = useRouteMatch()
  const isRevisionForm = path.includes('add_revision')
  const [step, toggleStep] = useState(1)
  const documentFields = useSelector(state => state.documents.current)

  const submitDocument = useCallback(values => {
    if (step === 1) return toggleStep(2)

    if (values.send_emails && !values.emails) {
      values.send_emails = false
    }

    if (isRevisionForm) {
      return dispatch(startCreateRevision(document_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${projectId}/documents/` }))
    }

    return document_id
      ? dispatch(startUpdateDocument(document_id, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${projectId}/documents/` }))
      : dispatch(startCreateDocument(projectId, values))
        .then(() => history.push({ pathname: `/dashboard/projects/${projectId}/documents/` }))
  }, [dispatch, step, isRevisionForm])

  useEffect(() => {
    document_id
      ? dispatch(startEditDocument(document_id))
      : dispatch(newDocument(projectId))
    dispatch(dmsUsers(projectId))
  }, [dispatch, projectId, document_id])

  useEffect(() => {
    if (document_id) {
      if (isRevisionForm) {
        const revNumberIndex = documentFields.document_fields
          .findIndex(df => df.codification_kind === 'revision_number')
        if (revNumberIndex > -1) {
          const revNumverValue = documentFields.document_fields[revNumberIndex].value
          documentFields.document_fields[revNumberIndex].value = String(Number(revNumverValue) + 1)
            .padStart(2, 0)
        }
      }
      initialize(documentFields)
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
  }, [document_id, documentFields, isRevisionForm])

  return (
    <DMSLayout
      sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
      content={<Content
        handleSubmit={handleSubmit(submitDocument)}
        step={step}
        submitDocument={submitDocument}
        submitEvent={handleSubmit}
        isRevisionForm={isRevisionForm}
        backStep={() => toggleStep(1)}
      />}
    />
  )
}

export default reduxForm({ form: 'document_form' })(DocumentForm)
