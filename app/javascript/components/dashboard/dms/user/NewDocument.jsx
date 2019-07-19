import React, { useState, useEffect }  from 'react'
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

const menuItems = [
  {
    title: 'Documents data & files',
    icon: 'task-checklist-icon',
    menuStep: 1
  },
  {
    title: 'Access & Communication',
    icon: 'task-list-settings-icon',
    menuStep: 2
  }
]

const folders = [
  {
    title: 'My concerns',
    checked: true,
    disabled: false
  },
  {
    title: 'Not relevant for me',
    checked: false,
    disabled: false
  },
  {
    title: 'All documents',
    checked: false,
    disabled: true
  },
  {
    title: 'My documents',
    checked: false,
    disabled: true
  },
]

const PopCreateFolder = () => {
  const [popup, togglePopup] = useState(true)

  return (
    <div className='copy-to-folder-block'>
      <button className='btn btn-copy-to-folder' onClick={() => togglePopup(!popup)}>Copy to folder</button>

      {popup &&
        <div className='copy-to-folder-block__popup'>
          <label className='copy-to-folder-block__popup_title'>Copy to folder</label>
          <ul>
            <li className='new-folder'>
              <button className='btn'>
                <i className='svg-icon blue-plus-icon' />
                <span>New folder</span>
              </button>
            </li>
            {folders.map((el, i) => (
              <li
                key={i}
                className={classnames({ 'disabled': el.disabled }, { 'checked': el.checked })}
              >
                <button className='btn'>
                  <input
                    type='checkbox'
                    id={el}
                    checked={el.checked}
                    onChange={val => console.log(val)}
                  />
                  <label htmlFor='my_concerns' />
                  <i
                    className={classnames('svg-icon black',
                      { 'folder-icon': !el.disabled },
                      { 'folder-icon-2': el.disabled })}
                  />
                  <span>{el.title}</span>
                </button>
              </li>
            ))}
            </ul>
          </div>}
    </div>
  )
}

const SideBar = ({ step, toggleStep }) => (
  <div className='dms-sidebar-menu'>

    <div className='dms-sidebar-menu__document-title'>
      <div className='editable-title p-0'>
        <div className='form-group mb-0'>
          <Field
            component={InputField}
            name='document_name'
            id='document_name'
            label='Document name'
            placeholder='Document name'
          />
        </div>
      </div>
      {PopCreateFolder()}
      {false && <React.Fragment>
        <div className='copied-to-folder'>
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
              <i className={classnames('svg-icon black', icon )} />
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
