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

const initState = {
  modalOpen: false
}

class DocFieldsTable extends Component {

  state = initState

  componentWillMount() {
    const { editConvention, match: { params: { project_id } } } = this.props
    editConvention(project_id)
  }
  
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ ...initState })

  handleSubmit = values => {
    const { startUpdateConvention, match: { params: { project_id } }  } = this.props
    console.log(values)
    return startUpdateConvention(project_id, values)
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
    return (
      <ModalCreateField
        modalOpen={modalOpen}
        handleClose={this.handleClose}
      />
    )
  }

  renderDocIdFields = () => (
    <React.Fragment>
      <div className='draggable-container undraggable'>
        <div className='form-group'>
          <label>Pleace select or generate Document ID</label>

          <div className='input-container'>
            <div className='document-id-code'>
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='MWP'
                disabled
              />
            </div>
            <div className='document-id-code'>
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='STX'
                disabled
              />
            </div>
            <div className='document-id-code'>
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='EOS'
                disabled
              />
            </div>
            <div className='document-id-code'>
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXX'
                disabled
              />
            </div>
            <div className='document-id-code'>
              <input
                className='form-control'
                type='text'
                name='document_id'
                id='document_id'
                placeholder='XXXX'
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div className='draggable-container undraggable'>
        <div className='form-group'>
          <div className='checkbox-field justify-content-center'>
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

  renerFooter = () => {
    const { reset } = this.props
    return (
      <div className='dms-footer edit-convetion-footer'>
        <div className='changes-description'>
          You made changes to the upload <b>form 1.0 of convention 2 (not applied)</b>.
          Do you want to save all changes to update this form to <b>version 1.1</b>?
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
      <div className='dms-footer edit-convetion-footer'>
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
    const { handleSubmit, pristine, id } = this.props

    return (
      <React.Fragment>
        <div className='dms-content__header p-4'>
          <div className='d-flex align-items-center'>
            <h4>Add documents data & files</h4>
            <label className='rounded-label red ml-4'>
              Form version 0.1
              <i className='svg-icon pink lock-icon ml-2' />
            </label>
          </div>
          <div className='dms-content__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0 phases-row'>
              <li className='col-3 active'>
                <button>Planning</button>
              </li>
              <li className='col-3'>
                <button>Development</button>
              </li>
              <li className='col-3'>
                <button>Execution</button>
              </li>
              <li className='col-3'>
                <button>Operation</button>
              </li>
              <button className='btn edit-button'>
                Edit
              </button>
            </ul>
          </div>
        </div>
        {this.renderModalCreateField()}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <form
            className='form-body'
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            <div className='p-4'>
              <div className='row'>
                <div className='col-6'>
                  {this.renderDocIdFields()}
                  <DocFieldsColumn
                    column='1'
                    openInputForm={this.handleOpen}
                    disabled={!!id}
                  />
                </div>
                <div className='col-6'>
                  <DocFieldsColumn
                    column='2'
                    openInputForm={this.handleOpen}
                    disabled={!!id}
                  />
                </div>
              </div>
              {!id && this.renderModalButton()}
            </div>
            {(() => {
              if (!id) {
                return (
                  this.renerFooterForNewConv()
                )
              } else if (!pristine) {
                return (
                  this.renerFooter()
                )
              }
            })()}
          </form>
        </ DragDropContext>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  id: state.conventions.current.id,
  fields: getFormValues('convention_form')(state),
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