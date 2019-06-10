import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
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

const typeVariants = [
  {
    value: 'select_field',
    label: 'Dropdown',
    icon: dropdownIcon
  },
  {
    value: 'text_field',
    label: 'Textbox (one row)',
    icon: textIcon
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
  sections: [],
  newSection: '',
  modalOpen: false 
}

class ModalCreateField extends Component {

  state = initState

  componentWillReceiveProps(newProps) {
    const { initialValues: { document_field_values } } = newProps
    this.setState({ sections: document_field_values || [] })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    const { destroyForm, discardInitialValues } = this.props
    this.setState({ ...initState })
    destroyForm()
    discardInitialValues()
  }

  onDragEnd = result => {
    const { sections } = this.state
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

    const newSections = new Array(...sections)
    newSections.splice(source.index, 1)
    newSections.splice(destination.index, 0, sections[draggableId])

    const newState = {
      sections: [
        ...newSections
      ]
    }

    this.setState(newState)
  }

  handleChange = e =>  this.setState({ newSection: e.target.value })

  addNewSection = index => {
    const { sections, newSection } = this.state
    if (index === undefined && newSection.length < 1) return

    const position = index > -1 ? index : sections.length
    const newValue = {
      id: null,
      value: newSection,
      label: newSection,
      position
    }

    sections.splice(position, 0, newValue)
    this.setState({ sections, newSection: '' })
  }

  handleSubmit = field => {
    const { updateFields, column, row, isEdit } = this.props
    const { sections } = this.state
    field['document_field_values'] = sections
    field['column'] = column
    field['row'] = row
    
    updateFields(field, isEdit)
    this.handleClose()
  }

  renderModalContent = () => {
    const { field_type, isEdit } = this.props
    const { sections, newSection } = this.state

    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div className='modal-container'>
          <div className="modal-container__title-block">
            <h4>New input field</h4>
            <span className='info'>Limit access</span>
          </div>
          <div className="modal-container__content-block">
            <div className='form-group'>
              <InputField
                type='text'
                name='title'
                id='title'
                placeholder='Title (e.g. Discipline)'
                label='Type in title'
              />
            </div>
            <div className='form-group'>
              <InputField
                type='text'
                name='command'
                id='command'
                placeholder='Command (e.g. Select discipline)'
                label='Type in command'
              />
            </div>
            <div className='form-group'>
              <Field
                name='kind'
                id='kind'
                label='Choose field type'
                placeholder='Field type'
                options={typeVariants}
                component={SelectField}
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
                  sections={sections}
                  onDragEnd={this.onDragEnd}
                  addNewSection={this.addNewSection}
                />

                <div className="new-dropdown-section-block form-froup">
                  <div className="new-dropdown-section">
                    <input
                      id='new-section'
                      name='new-section'
                      type='text'
                      className='form-control'
                      value={newSection}
                      placeholder={`Section ${sections.length + 1}`}
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
            {isEdit ? 'Update' : 'Create' }
          </button>
        </div>
      </form>
    )
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
