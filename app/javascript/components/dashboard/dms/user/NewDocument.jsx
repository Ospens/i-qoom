import React, { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import DocumentsAndFiles from './DocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'
import DocIdModal from '../DocIdModal'
import AddRevisionModal from '../AddRevisionModal'
import DMSLayout from '../DMSLayout'
import DocumentSideBar from './DocumentSideBar'

const Content = ({ customSubmitDocument, step, toggleStep }) => (
  <form className='dms-content bordered' onSubmit={customSubmitDocument}>
    {step === 1
      ? <DocumentsAndFiles nextStep={() => toggleStep(2)} />
      : <AccessAndCommunication backStep={() => toggleStep(1)} />
    }
  </form>
)

function NewDocument({ handleSubmit, history, match: { params: { project_id } } }) {
  const [modalId, setModalId] = useState(0)
  const [step, toggleStep] = useState(1)
  const dispatch = useDispatch()

  const createDocument = (useCallback(values =>
    dispatch(startCreateDocument(project_id, values)),
    [dispatch]))

  const getNewDocument = useCallback(() =>
    dispatch(newDocument(project_id)),
    [dispatch])

  useEffect(() => { getNewDocument(project_id) }, [])

  const submitDocument = values => {
    return createDocument(values)
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }

  const customSubmitDocument = handleSubmit(submitDocument)

  return (
    <React.Fragment>
      {modalId === 1 && <DocIdModal />}
      {modalId === 2 && <AddRevisionModal />}
      <DMSLayout
        sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
        content={<Content {...{ customSubmitDocument, step, toggleStep }} />}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: { document_fields: state.documents.newDocumentFields.document_fields },
  enableReinitialize: !ownProps.initialValues
})

export default connect(mapStateToProps)(reduxForm({
  form: 'document_form'
})(withRouter(NewDocument)))
