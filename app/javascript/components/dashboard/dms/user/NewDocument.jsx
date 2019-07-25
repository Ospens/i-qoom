import React, { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import DocIdModal from '../DocIdModal'
import AddRevisionModal from '../AddRevisionModal'
import DMSLayout from '../DMSLayout'
import DocumentSideBar from './DocumentSideBar'
import DocumentFields from './DocumentForm'

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
    if (step === 1) return toggleStep(2)
    return createDocument(values)
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }

  return (
    <React.Fragment>
      {modalId === 1 && <DocIdModal />}
      {modalId === 2 && <AddRevisionModal />}
      <DMSLayout
        sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
        content={
          <DocumentFields
            handleSubmit={handleSubmit(submitDocument)}
            {...{ step, toggleStep }}
          />}
      />
    </React.Fragment>
  )
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: { document_fields: state.documents.documentFields.document_fields },
  enableReinitialize: !ownProps.initialValues
})

export default connect(mapStateToProps)(reduxForm({
  form: 'document_form'
})(withRouter(NewDocument)))
