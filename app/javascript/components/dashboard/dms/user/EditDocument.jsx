import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import classnames from 'classnames'
import { newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import InputField from '../../../../elements/InputField'
import DocumentsAndFiles from './DocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'
import DocIdModal from '../DocIdModal'
import AddRevisionModal from '../AddRevisionModal'
import DMSLayout from '../DMSLayout'
import FolderInfo from './FolderInfo'
import DocumentSideBar from './DocumentSideBar'


function Content({ handleSubmit, startCreateDocument, project_id, step, toggleStep, history }) {

  const createDocument = values => {
    return startCreateDocument(project_id, values)
      .then(() => history.push({ pathname: `/dashboard/projects/${project_id}/documents/` }))
  }

  return (
    <form
      className='dms-content bordered'
      onSubmit={handleSubmit(createDocument)}
    >
      {step === 1
        ? <DocumentsAndFiles nextStep={() => toggleStep(2)} />
        : <AccessAndCommunication backStep={() => toggleStep(1)} />
      }
    </form>
  )
}

function EditDocument({ getNewDocument, startCreateDocument, handleSubmit, history, match: { params: { project_id } } }) {
  const [modalId, setModalId] = useState(0)
  const [step, toggleStep] = useState(1)
  useEffect(() => { getNewDocument(project_id) }, [])

  return (
    <React.Fragment>
      {modalId === 1 && <DocIdModal />}
      {modalId === 2 && <AddRevisionModal />}
      <DMSLayout
        sidebar={<DocumentSideBar {...{ step, toggleStep }} />}
        content={<Content {...{ handleSubmit, startCreateDocument, project_id, step, toggleStep, history }} />}
      />
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  getNewDocument: (projectId) => dispatch(newDocument(projectId)),
  startCreateDocument: (projectId, values) => dispatch(startCreateDocument(projectId, values))
})

const mapStateToProps = (state, ownProps) => ({
  initialValues: { document_fields: state.documents.newDocumentFields.document_fields },
  enableReinitialize: !ownProps.initialValues
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'document_form'
})(withRouter(EditDocument)))
