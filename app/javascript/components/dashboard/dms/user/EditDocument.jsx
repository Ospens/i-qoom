import React, { useState, useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'
import { startEditDocument, startUpdateDocument } from '../../../../actions/documentsActions'
import AddRevisionModal from '../AddRevisionModal'
import DMSLayout from '../DMSLayout'
import DocumentSideBar from './DocumentSideBar'
import DocumentFields from './DocumentForm'

function EditDocument({ handleSubmit, history, match: { params: { project_id, document_id } } }) {
  const [modalId, setModalId] = useState(0)
  const [step, toggleStep] = useState(1)
  const dispatch = useDispatch()

  const updateDocument = (useCallback(values =>
    dispatch(startUpdateDocument(document_id, values)),
    [dispatch]))

  const getEditDocument = useCallback(() =>
    dispatch(startEditDocument(document_id)),
    [dispatch])

  useEffect(() => { getEditDocument() }, [])

  const submitDocument = values => {
    return updateDocument(values)
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }

  return (
    <React.Fragment>
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
  initialValues: { ...state.documents.documentFields },
  enableReinitialize: !ownProps.initialValues
})

export default connect(mapStateToProps)(reduxForm({
  form: 'document_form'
})(withRouter(EditDocument)))
