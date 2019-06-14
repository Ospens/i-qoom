import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  SubmissionError,
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field,
  destroy
} from 'redux-form'
import {
  updateFields,
  discardInitialValues
} from '../../../../../actions/conventionActions'
import DraggableDropDown from './DraggableDropDown'
import InputField from '../../../../../elements/InputField'
import NewModal from '../../../../../elements/Modal'
import SelectField from '../../../../../elements/SelectField'
import CheckboxField from '../../../../../elements/CheckboxField'
import dropdownIcon from '../../../../../images/form_1'
import textIcon from '../../../../../images/form_2'
import textareaIcon from '../../../../../images/form_3'
import uploadIcon from '../../../../../images/form_4'
import dateIcon from '../../../../../images/form_5'
import ModalLimitAccess from './ModalLimitAccess'

const typeVariants = [
  {
    value: 'text_field',
    label: 'Textbox (one row)',
    icon: textIcon
  },
  {
    value: 'select_field',
    label: 'Dropdown',
    icon: dropdownIcon
  },
  {
    value: 'textarea_field',
    label: 'Textbox (Comment)',
    icon: textareaIcon
  },
  {
    value: 'upload_field',
    label: 'Upload field',
    icon: uploadIcon
  },
  {
    value: 'date_field',
    label: 'Date field',
    icon: dateIcon
  }
]

const initState = {
  limitAccess: false,
  newSection: '',
  modalOpen: false 
}

class ModalCreateField extends Component {

  state = initState

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    const { destroyForm, discardInitialValues } = this.props
    this.setState({ ...initState })
    destroyForm()
    discardInitialValues()
  }

  onDragEnd = result => {
    const { document_field_values } = this.props
    const { destination, source } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let { draggableId } = result
    draggableId = draggableId.replace(/field_/g, '')
    const newSections = new Array(...document_field_values)
    newSections.splice(source.index, 1)
    newSections.splice(destination.index, 0, document_field_values[draggableId])

    this.props.change('document_field_values', newSections)
  }

  handleChange = e =>  this.setState({ newSection: e.target.value })

  addNewSection = index => {
    const { newSection } = this.state
    const { document_field_values } = this.props
    if (index === undefined && newSection.length < 1) return

    const position = index > -1 ? index : document_field_values.length
    const newValue = {
      id: null,
      value: newSection,
      label: newSection
    }

    document_field_values.splice(position, 0, newValue)
    this.setState({ newSection: '' })
    this.props.change('document_field_values', document_field_values)
  }

  removeSection = index => {
    const { document_field_values } = this.props
    document_field_values.splice(index, 1)
    this.props.change('document_field_values', document_field_values)
  }

  copySection = index => {
    const { document_field_values } = this.props
    const newValue = document_field_values[index]
    document_field_values.splice(index, 0, newValue)
    this.props.change('document_field_values', document_field_values)
  }

  changeDDSection = (newValue, index) => {
    const { document_field_values } = this.props
    const updatedValue = {
      ...document_field_values[index],
      value: newValue,
      label: newValue
    }
    document_field_values.splice(index, 1, updatedValue)
    
    this.props.change('document_field_values', document_field_values)
  }

  validations = field => {
    const errors = {}
    const { document_field_values } = this.props

    if (!field.title) {
      errors['title'] = ['Required']
    }
    if (!field.command) {
      errors['command'] = ['Required']
    }
    if (!field.kind) {
      errors['kind'] = ['Required']
    }
    if (field.kind === 'select_field'
        && document_field_values.length < 1
        ) {
        errors['kind'] = ['Add some value']
      }
    if (Object.keys(errors).length < 1) return

    throw new SubmissionError({ ...errors })
  }

  handleSubmit = (field, e) => {
    e.preventDefault()
    e.stopPropagation()
    const { updateFields, column, row, isEdit } = this.props
    const { document_field_values } = this.props
    this.validations(field)

    // TODO: fields don't rerender after drag'n'drop
    let newSections = []
    if (field.kind === 'select_field') {
      newSections = document_field_values.map((el, i) => {
        const newEl = {
          ...el,
          'position': i
        }
        return newEl
      })
    }
    field['document_field_values'] = newSections
    field['column'] = column
    field['row'] = row
    const newField = new Array(field)

    updateFields(...newField, isEdit)
    this.handleClose()
  }

  renderFieldForm = () => {
    const {
      field_type,
      isEdit,
      handleSubmit,
      submitErrors,
      initialValues: { title }
    } = this.props
    const { document_field_values } = this.props
    const { newSection } = this.state

    return (
      <form onSubmit={e => handleSubmit(v => this.handleSubmit(v, e))()}>
        <div className='modal-container'>
          <div className="modal-container__title-block">
            <h4>{title || 'New input field'}</h4>
            <button
              type='button'
              className='btn color-blue p-0 ml-auto'
              onClick={() => this.setState({ limitAccess: true })}
            >
              Limit access
            </button>
          </div>
          <div className="modal-container__content-block">
            <div className='form-group'>
              <InputField
                type='text'
                name='title'
                id='title'
                placeholder='Title (e.g. Discipline)'
                label='Type in title'
                errorField={submitErrors}
              />
            </div>
            <div className='form-group'>
              <InputField
                type='text'
                name='command'
                id='command'
                placeholder='Command (e.g. Select discipline)'
                label='Type in command'
                errorField={submitErrors}
              />
            </div>
            <div className='form-group'>
              <Field
                name='kind'
                id='kind'
                label='Choose field type'
                placeholder='Field type'
                defaultValue={typeVariants[0]}
                options={typeVariants}
                component={SelectField}
                errorField={submitErrors}
              />
            </div>
            <div className='form-group d-flex'>
              <CheckboxField
                name='required'
                checkBoxId='required'
                labelClass='form-check-label mr-2'
                text='Required field'
              />
              {field_type === 'select_field' &&
              <CheckboxField
                name='enable_multi_selections'
                name='enable_multi_selections'
                checkBoxId='enable_multi_selections'
                labelClass='form-check-label mx-2'
                text='Enable multi selections'
              />
              }
            </div>
            {field_type === 'select_field' &&
              <div>
                <div><label>Define selections</label></div>
                <div><label>Selections</label></div>
                <DraggableDropDown
                  sections={document_field_values}
                  onDragEnd={this.onDragEnd}
                  addNewSection={this.addNewSection}
                  removeSection={this.removeSection}
                  copySection={this.copySection}
                  changeDDSection={this.changeDDSection}
                />

                <div className="new-dropdown-section-block form-froup">
                  <div className="new-dropdown-section">
                    <input
                      id='new-section'
                      name='new-section'
                      type='text'
                      className='form-control'
                      value={newSection}
                      placeholder={`Section ${document_field_values.length + 1}`}
                      onChange={(e) => this.handleChange(e)}
                      onBlur={() => this.addNewSection()}
                    />
                  </div>
                </div>
              </div>}
          </div>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-white'
            onClick={this.handleClose}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-purple'>
            {isEdit ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    )
  }

  renderModalContent = () => {
    const { limitAccess } = this.state
    const { initialValues: { title } } = this.props
    if (limitAccess) return (
      <ModalLimitAccess
        handleBack={() => this.setState({ limitAccess: false })}
        handleClose={this.handleClose}
        title={title}
      />
    )

    return this.renderFieldForm()
  }

  renderTrigger = content => {
    return (
      <div onClick={this.handleOpen}>
        {content}
      </div>
    )
  }

  render() {
    const { modalOpen } = this.state
    const { triggerContent } = this.props

    return (
      <NewModal
        content={this.renderModalContent()}
        trigger={this.renderTrigger(triggerContent)}
        modalOpen={modalOpen}
        handleClose={this.handleClose}
      />
    )
  }
}

const selector = formValueSelector('convention_input_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('convention_input_form')(state),
  field_type: selector(state, 'kind'),
  document_field_values: selector(state, 'document_field_values') || [],
  initialValues: state.conventions.editingField
})

const mapDispatchToProps = dispatch => ({
  updateFields: (field, edit) => dispatch(updateFields(field, edit)),
  destroyForm: () => dispatch(destroy('convention_input_form')),
  discardInitialValues: () => dispatch(discardInitialValues(''))
})

export default connect(
  mapStateToProps, mapDispatchToProps
  )(reduxForm({
    form: 'convention_input_form',
    enableReinitialize: true
  })(ModalCreateField))
