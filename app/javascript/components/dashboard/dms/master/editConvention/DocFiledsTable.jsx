import React, { Component } from 'react'
import {
  getFormSubmitErrors,
  reduxForm,
} from 'redux-form'
import { connect } from 'react-redux'
import {
  startEditConvention,
  startUpdateConvention
} from '../../../../../actions/conventionActions'
import ReactSVG from 'react-svg'
import lockIcon from '../../../../../images/Locked'
import { reorderFields } from '../../../../../actions/conventionActions'
import { DragDropContext } from 'react-beautiful-dnd'
import { DocFieldsColumn } from './DocFieldsColumn'
import ModalCreateField from './ModalCreateField'

class DocFiledsTable extends Component {

  handleSubmit = values => {
    const { startUpdateConvention } = this.props
    startUpdateConvention()
    console.log(values)
  }

  componentWillMount() {
    const { editConvention } = this.props
    editConvention()
  }

  onDragEnd = result => {
    const { fields, reorderFields } = this.props
    reorderFields(result, fields)
  }

  renderModalButton = () => (
    <button
      type='button'
      className="btn btn-create-new-field btn-purple my-4"
    >
      Create new input field
    </button>
  )

  renderModalCreateField = (column, row, trigger, isEdit) => (
    <ModalCreateField
      column={column}
      row={row}
      triggerContent={trigger}
      isEdit={isEdit}
    />
  )

  render() {
    const { fields, handleSubmit } = this.props
    const fieldsKeys = Object.keys(fields)

    return (
      <React.Fragment>
        <div className='dms-content__header p-4'>
          <div className="d-flex align-items-center">
            <h4>Add documents data & files</h4>
            <label className="rounded-label red ml-4">
              Form version 0.1
              <ReactSVG
                svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                src={lockIcon}
              />
            </label>
          </div>
          <div className='dms-content__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0 phases-row'>
              <li className='col-3 active'>
                <button>
                  Planning
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Development
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Execution
                </button>
              </li>
              <li className='col-3'>
                <button>
                  Operation
                </button>
              </li>
              <button className="btn edit-button">
                Edit
              </button>
            </ul>
          </div>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <form
            className='form-body'
            onSubmit={handleSubmit(this.handleSubmit)}
          >
            <div className="p-4">
              <div className='row'>
                {fieldsKeys.map((key, i) => (
                  <DocFieldsColumn
                    column={i + 1}
                    fields={fields[key]}
                    key={i}
                    modalCreateField={this.renderModalCreateField}
                  />
                ))}
              </div>
              {this.renderModalCreateField(2, fields[2].length + 1, this.renderModalButton())}
            </div>
            <div className='dms-footer edit-convetion-footer'>
              <div className='changes-description'>
                You made changes to the upload <b>form 1.0 of convention 2 (not applied)</b>.
                Do you want to save all changes to update this form to <b>version 1.1</b>?
              </div>
              <div className="d-flex">
                <button type='button' className='btn btn-white'>Discard</button>
                <button type='submit' className='btn btn-purple'>Save all changes</button>
              </div>
            </div>
          </form>
        </ DragDropContext>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  submitErrors: getFormSubmitErrors('convention_form')(state),
  fields: state.conventions.current.grouped_fields
})

const mapDispatchToProps = dispatch => ({
  reorderFields: (result, fields) => dispatch(reorderFields(result, fields)),
  editConvention: () => dispatch(startEditConvention()),
  startUpdateConvention: (values) => dispatch(startUpdateConvention(values))
})

export default connect(
  mapStateToProps, mapDispatchToProps
  )(reduxForm({
    form: 'convention_form'
  })(DocFiledsTable))
