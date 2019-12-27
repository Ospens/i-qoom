import React, { Component } from 'react'
import { reduxForm, getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  startEditConvention,
  startUpdateConvention,
  reorderFields
} from '../../../../../actions/conventionActions'
import { DragDropContext } from 'react-beautiful-dnd'
import { DocFieldsColumn } from './DocFieldsColumn'
import ModalCreateField from './ModalCreateField'
import DocumentIdInputs from '../../DocumentIdInputs'

const initState = {
  modalOpen: false
}

class DocFieldsTable extends Component {

  state = initState

  UNSAFE_componentWillMount() {
    const { editConvention, match: { params: { projectId } } } = this.props
    editConvention(projectId)
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ ...initState })

  handleSubmit = values => {
    const { startUpdateConvention, match: { params: { projectId } }  } = this.props
    return startUpdateConvention(projectId, values)
  }

  onDragEnd = result => {
    const { fields, reorderFields } = this.props
    reorderFields(result, fields)
  }

  renderModalButton = () => (
    <button
      type='button'
      className='btn btn-create-new-field btn-purple my-4'
      onClick={() => this.handleOpen()}
    >
      Create new input field
    </button>
  )

  renderModalCreateField = () => {
    const { modalOpen } = this.state
    const { fields } = this.props
    const values = {
      column: 2,
      row: fields ? fields.column_2.length : {}
    }

    return (
      <ModalCreateField
        modalOpen={modalOpen}
        handleClose={this.handleClose}
        initialValues={values}
      />
    )
  }

  renderDocIdFields = () => (
    <React.Fragment>
      <div className='draggable-container undraggable'>
        <DocumentIdInputs
          origCompanyValue='XXX'
          disciplineValue='XXX'
          docTypeValue='XXX'
          docNumberValue='XXXX'
        />
      </div>
      <div className='draggable-container undraggable'>
        <div className='form-group'>
          <div className='d-flex align-items-center justify-content-center'>
            <input
              name='generate_id'
              id='generate_id'
              type='checkbox'
              className='form-check-input'
            />
            <label className='form-check-label mr-2' htmlFor='generate_id' />
            <span>Generate Document ID through file code</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  )

  renderFooter = () => {
    const { reset, version } = this.props

    return (
      <div className='dms-footer data-changed-footer'>
        <div className='changes-description'>
          You made changes to the upload <b>form {version} of Convention 1</b>.
          Do you want to save all changes to update this form to <b>version {version + 1}</b>?
        </div>
        <div className='d-flex'>
          <button
            type='button'
            className='btn btn-white'
            onClick={reset}
          >
            Discard
          </button>
          <button type='submit' className='btn btn-purple'>
            Save all changes
          </button>
        </div>
      </div>
    )
  }

  renerFooterForNewConv = () => {
    const { reset } = this.props
    return (
      <div className='dms-footer data-changed-footer'>
        <div className='d-flex'>
          <button
            type='button'
            className='btn btn-white'
            onClick={reset}
          >
            Discard
          </button>
          <button type='submit' className='btn btn-purple'>
            Create convention
          </button>
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit, pristine, fields } = this.props

    return (
      <React.Fragment>
        <div className='dms-content__header'>
          <div className='d-flex align-items-center'>
            <h4>Add documents data & files</h4>
            <label className='rounded-label red ml-4'>
              Form version 0.1
              <i className='icon-Locked ml-2' />
            </label>
          </div>
          <div className='dms-content__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0 phases-row'>
              <li className='col-3 active'>
                <button type='button'>Planning</button>
              </li>
              <li className='col-3'>
                <button type='button'>Development</button>
              </li>
              <li className='col-3'>
                <button type='button'>Execution</button>
              </li>
              <li className='col-3'>
                <button type='button'>Operation</button>
              </li>
              <button className='edit-button' type='button'>
                Edit
              </button>
            </ul>
          </div>
        </div>
        {fields && this.renderModalCreateField()}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <form
            noValidate={true}
            className='form-body'
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            <div>
              <div className='row'>
                <div className='col-6'>
                  {this.renderDocIdFields()}
                  <DocFieldsColumn
                    column='1'
                    openInputForm={this.handleOpen}
                    // TODO: change it
                    disabled={true}
                  />
                </div>
                <div className='col-6'>
                  <DocFieldsColumn
                    column='2'
                    openInputForm={this.handleOpen}
                    // TODO: change it
                    disabled={true}
                  />
                </div>
              </div>
              {this.renderModalButton()}
            </div>
          </form>
          {!pristine && this.renderFooter()}
        </ DragDropContext>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  fields: getFormValues('convention_form')(state),
  version: state.conventions.current.version,
})

const mapDispatchToProps = dispatch => ({
  reorderFields: (result, fields) => dispatch(reorderFields(result, fields)),
  editConvention: projectId => dispatch(startEditConvention(projectId)),
  startUpdateConvention: (projectId, values) => dispatch(startUpdateConvention(projectId, values)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
  )(reduxForm({
    form: 'convention_form'
  })(withRouter(DocFieldsTable)))
