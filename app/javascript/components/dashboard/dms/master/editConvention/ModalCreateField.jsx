import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field
} from 'redux-form'
import ReactSVG from 'react-svg'
import { startCreateField } from '../../../../../actions/conventionActions'
import DraggableDropDown from './DraggableDropDown'
import dots from '../../../../../images/dots-horizontal'
import InputField from '../../../../../elements/InputField'
import ModalComponent from '../../../../../elements/ModalComponent'
import SelectField from '../../../../../elements/SelectField'
import CheckboxField from '../../../../../elements/CheckboxField'
import dropdownIcon from '../../../../../images/form_1'
import textIcon from '../../../../../images/form_2'
import textareaIcon from '../../../../../images/form_3'
import uploadIcon from '../../../../../images/form_4'
import dateIcon from '../../../../../images/form_5'

const typeVariants = [
  {
    value: 'dropdown',
    label: 'Dropdown',
    icon: dropdownIcon
  },
  {
    value: 'text',
    label: 'Textbox (one row)',
    icon: textIcon
  },
  {
    value: 'textarea',
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

class ModalCreateField extends Component {

  state = {
    sections: [
      {
        value: 'test333'
      },
      {
        value: 'lorem'
      }
    ],
    newSection: ''
  }

  onDragEnd = result => {
    const { sections } = this.state
    const { destination, source } = result

    if (!destination) {
      return
    }

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

  handleChange = e => {
    this.setState({ newSection: e.target.value });
  }

  addSection = () => {
    const { sections, newSection } = this.state
    if (newSection.length < 1) {
      return
    }
    const newValue = {
      value: newSection,
      index: sections.length
    }
    sections.push(newValue)
    this.setState({ sections, newSection: '' })
  }

  render() {
    const { closeModal, submitErrors, field_type } = this.props
    const { sections, newSection } = this.state

    return (
      <ModalComponent>
        <div className='modal-container'>
          <div className="modal-container__title-block">
            <h4>New input field</h4>
            <span className='info'>Limit access</span>
          </div>
          <div className="modal-container__content-block">
            <form>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='revision_number'
                  id='revision_number'
                  placeholder='Command (e.g. Select discipline)'
                  label='Type in command'
                />
              </div>
              <div className='form-group'>
                <InputField
                  type='text'
                  name='revision_number'
                  id='revision_number'
                  placeholder='Title (e.g. Discipline)'
                  label='Type in title'
                />
              </div>
              <div className='form-group'>
                <Field
                  name='field_type'
                  id='field_type'
                  label='Choose field type'
                  placeholder='Field type'
                  options={typeVariants}
                  value={field_type}
                  newValue={field_type}
                  component={SelectField}
                />
              </div>
              <div className='form-group d-flex'>
                <CheckboxField
                  name='required_field'
                  checkBoxId='required_field'
                  labelClass='form-check-label mr-2'
                  text='Required field'
                />
                {field_type === 'dropdown' &&
                  <CheckboxField
                    name='enable_multi_selections'
                    checkBoxId='enable_multi_selections'
                    labelClass='form-check-label mx-2'
                    text='Enable multi selections'
                  />
                }
              </div>
              {field_type === 'dropdown' &&
              <div className="">
                <div><label>Define selections</label></div>
                <div><label>Selections</label></div>
                <DraggableDropDown
                  sections={sections}
                  onDragEnd={this.onDragEnd}
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
                      onBlur={() => this.addSection()}
                      />
                    <ReactSVG
                      svgStyle={{ height: 20, marginLeft: 10 }}
                      src={dots}
                    />
                  </div>
                </div>
              </div>
              }
            </form>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-white'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-purple'>Create</button>
        </div>
      </ModalComponent>
    )
  }
}

const selector = formValueSelector('new_input_form')

const mapStateToProps = (state) => ({
  submitErrors: getFormSubmitErrors('new_input_form')(state),
  field_type: selector(state, 'field_type')
})
const mapDispatchToProps = dispatch => ({
  createField: () => dispatch(startCreateField(values))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'new_input_form' })(ModalCreateField))
