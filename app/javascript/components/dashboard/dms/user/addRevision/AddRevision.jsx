import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../DMSLayout'
import DocumentSideBar from '../DocumentSideBar'
import { startEditDocument, startUpdateDocument } from '../../../../../actions/documentsActions'
import UploadFile from './UploadFile'
import AccessAndCommunication from '../AccessAndCommunication'
import { dmsUsers } from '../../../../../actions/projectActions'

function Content({ handleSubmit, step, backStep }) {
  return (
    <form noValidate={true} className='dms-content bordered' onSubmit={handleSubmit}>
      {step === 1
        ? <UploadFile />
        : <AccessAndCommunication backStep={backStep} revision={true} />}
    </form>
  )
}

function AddRevision({ initialize, handleSubmit }) {
  const { document_id, project_id } = useParams()
  const dispatch = useDispatch()
  const [step, toggleStep] = useState(1)
  const documentFields = useSelector(state => state.documents.current)
  useEffect(() => {
    dispatch(startEditDocument(document_id))
    dispatch(dmsUsers(project_id))
  }, [dispatch, project_id, document_id])

  const submitDocument = useCallback(values => {
    if (step === 1) return toggleStep(2)

    return dispatch(startUpdateDocument(document_id, values))
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }, [dispatch, step])

  useEffect(() => { initialize({ ...documentFields }) }, [documentFields])

  return (
    <DMSLayout
      sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
      content={<Content handleSubmit={handleSubmit(submitDocument)} step={step} backStep={() => toggleStep(1)} />}
    />
  )
}

export default reduxForm({ form: 'revision_form' })(AddRevision)
