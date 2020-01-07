import React, { useState, useEffect, useCallback } from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import {
  startEditConvention,
  startUpdateConvention,
  reorderFields
} from '../../../../../actions/conventionActions'
import { DocFieldsColumn } from './DocFieldsColumn'
import ModalCreateField from './ModalCreateField'
import DocumentIdInputs from '../../DocumentIdInputs'

// const renerFooter = ({ reset }) => {
//   return (
//     <div className='dms-footer data-changed-footer'>
//       <div className='d-flex'>
//         <button
//           type='button'
//           className='btn btn-white'
//           onClick={reset}
//         >
//           Discard
//           </button>
//         <button type='submit' className='btn btn-purple'>
//           Create convention
//           </button>
//       </div>
//     </div>
//   )
// }

const renderModalButton = handleOpen => (
  <button
    type="button"
    className="btn btn-create-new-field btn-purple my-4"
    onClick={handleOpen}
  >
    Create new input field
  </button>
)

const renderModalCreateField = (modalOpen, fields, handleClose) => {
  const values = {
    column: 2,
    row: fields ? fields.column_2.length : {}
  }

  return (
    <ModalCreateField
      modalOpen={modalOpen}
      handleClose={handleClose}
      initialValues={values}
    />
  )
}

const renderDocIdFields = () => (
  <React.Fragment>
    <div className="draggable-container undraggable">
      <DocumentIdInputs
        origCompanyValue="XXX"
        disciplineValue="XXX"
        docTypeValue="XXX"
        docNumberValue="XXXX"
      />
    </div>
    <div className="draggable-container undraggable">
      <div className="form-group">
        <div className="d-flex align-items-center justify-content-center">
          <input
            name="generate_id"
            id="generate_id"
            type="checkbox"
            className="form-check-input"
          />
          <label className="form-check-label mr-2" htmlFor="generate_id" />
          <span>Generate Document ID through file code</span>
        </div>
      </div>
    </div>
  </React.Fragment>
)

const renderFooter = (reset, version) => (
  <div className="dms-footer data-changed-footer">
    <div className="changes-description">
      <span>You made changes to the upload</span>
      <b>
        <span> form </span>
        {version}
        <span> of Convention 1</span>
      </b>
      <span>. Do you want to save all changes to update this form to </span>
      <b>
        <span>version </span>
        {version + 1}
      </b>
      <span>?</span>
    </div>
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-white"
        onClick={reset}
      >
        Discard
      </button>
      <button type="submit" className="btn btn-purple">
        Save all changes
      </button>
    </div>
  </div>
)

function DocFieldsTable({ handleSubmit, pristine, reset }) {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const { projectId } = useParams()
  const fields = useSelector(state => getFormValues('convention_form')(state))
  const version = useSelector(state => state.conventions.current.version)

  useEffect(() => {
    dispatch(startEditConvention(projectId))
  }, [dispatch, projectId])
  const handleOpen = useCallback(() => setModalOpen(true), [])
  const handleClose = useCallback(() => setModalOpen(false), [])
  const onSubmit = useCallback(values => dispatch(startUpdateConvention(projectId, values)),
    [dispatch, projectId])
  const onDragEnd = useCallback(result => {
    dispatch(reorderFields(result, fields))
  }, [dispatch, fields])

  return (
    <React.Fragment>
      <div className="dms-content__header">
        <div className="d-flex align-items-center">
          <h4>Add documents data & files</h4>
          <label className="rounded-label red ml-4">
            <span>Form version 1</span>
            <i className="icon-Locked ml-2" />
          </label>
        </div>
        <div className="dms-content__project-phases">
          <span>Project phases</span>
          <ul className="row mx-0 phases-row">
            <li className="col-3 active">
              <button type="button">Planning</button>
            </li>
            <li className="col-3">
              <button type="button">Development</button>
            </li>
            <li className="col-3">
              <button type="button">Execution</button>
            </li>
            <li className="col-3">
              <button type="button">Operation</button>
            </li>
            <button className="edit-button" type="button">
              Edit
            </button>
          </ul>
        </div>
      </div>
      {fields && renderModalCreateField(modalOpen, fields, handleClose)}
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="form-body">
            <div className="row">
              <div className="col-6">
                {renderDocIdFields()}
                <DocFieldsColumn
                  column="1"
                  openInputForm={handleOpen}
                  // TODO: change it
                  disabled
                />
              </div>
              <div className="col-6">
                <DocFieldsColumn
                  column="2"
                  openInputForm={handleOpen}
                  // TODO: change it
                  disabled
                />
              </div>
            </div>
            {renderModalButton(handleOpen)}
          </div>
          {!pristine && renderFooter(reset, version)}
        </DragDropContext>
      </form>
    </React.Fragment>
  )
}

export default reduxForm({ form: 'convention_form' })(DocFieldsTable)
