import React, { useState, useEffect }  from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { withRouter } from 'react-router-dom'
import { FieldArray, reduxForm } from 'redux-form'
import classnames from 'classnames'
import { newDocument, startCreateDocument } from '../../../../actions/documentsActions'
import overviewIcon from '../../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../../images/task-list-settings'
import editIcon from '../../../../images/pencil-write'
import checkIcon from '../../../../images/check_1'
import DocumentsAndFiles from './DocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'
import DocIdModal from '../DocIdModal'
import AddRevisionModal from '../AddRevisionModal'
import DMSLayout from '../DMSLayout'

const menuItems = [
  {
    title: 'Documents data & files',
    icon: overviewIcon,
    menuStep: 1
  },
  {
    title: 'Access & Communication',
    icon: dmsSettingsIcon,
    menuStep: 2
  }
]

const SideBar = ({ step, toggleStep }) => (
  <div className='dms-sidebar-menu'>

    <div className='dms-sidebar-menu__document-title'>
      <div className='editable-title'>
        <h5>(Document name)</h5>
        <ReactSVG
          svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
          src={editIcon}
        />
      </div>
      <button className='btn copy-to-folder'>Copy to folder</button>
      {false && <React.Fragment>
        <div className='copied-to-folder'>
          <ReactSVG
            svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
            src={checkIcon}
          />
          <span>Copied to folders</span>
          <button className='btn copy-to-folder'>change</button>
        </div>
        <div className='not-relevant-for-me'>
          <span>Not relevant for me</span>
          <button className='btn copy-to-folder'>More</button>
        </div>
      </React.Fragment>}
    </div>

    <div className='dms-sidebar-menu__block'>
      <h4>DMS menu</h4>
      <ul className='dms-sidebar-menu__list'>
        {menuItems.map(({ menuStep, title, icon }, i) => (
          <li className='dms-sidebar-menu__item' key={i}>
            <button
              type='button'
              className={classnames('btn', { 'active': step === menuStep })}
              onClick={() => toggleStep(menuStep)}
            >
              <ReactSVG
                svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                src={icon}
              />
              <span className='head-button__gray-text'>{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)


function Content({ handleSubmit, startCreateDocument, project_id, step, toggleStep }) {
  const createDocument = values => {
    console.log(values)
    startCreateDocument(project_id, values)
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

function NewDocument({ getNewDocument, startCreateDocument, handleSubmit, match: { params: { project_id } } }) {
  const [modalId, setModalId] = useState(0)
  const [step, toggleStep] = useState(1)
  useEffect(() => { getNewDocument(project_id)}, [])

  return (
    <React.Fragment>
      {modalId === 1 && <DocIdModal />}
      {modalId === 2 && <AddRevisionModal />}
      <DMSLayout
        sidebar={<SideBar {...{ step, toggleStep}}/>}
        content={<Content {...{ handleSubmit, startCreateDocument, project_id, step, toggleStep }}/>}
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
})(withRouter(NewDocument)))
