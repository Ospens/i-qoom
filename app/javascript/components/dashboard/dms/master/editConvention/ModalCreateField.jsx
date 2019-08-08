import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field,
  FieldArray,
  destroy,
  arraySplice
} from 'redux-form'
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
import { required } from '../../../../../elements/validations'

const typeVariants = [
  {
    value: 'text_field',
    title: 'Textbox (one row)',
    icon: textIcon
  },
  {
    value: 'select_field',
    title: 'Dropdown',
    icon: dropdownIcon
  },
  {
    value: 'textarea_field',
    title: 'Textbox (Comment)',
    icon: textareaIcon
  },
  {
    value: 'upload_field',
    title: 'Upload field',
    icon: uploadIcon
  },
  {
    value: 'date_field',
    title: 'Date field',
    icon: dateIcon
  }
]

const initState = {
  limitAccess: false,
}

const validate = values => {
  const errors = {}
  if (values.kind === 'select_field'
    && values.document_field_values
    && values.document_field_values.length < 1
  ) {
    errors.new_section = 'Add some value'
  }
  return errors
}

class ModalCreateField extends Component {

  state = initState

  handleClose = () => {
    const { destroyForm, handleClose } = this.props
    handleClose()
    this.setState({ ...initState })
    destroyForm()
  }

  handleSubmit = field => {
    const { column = '2', row, spliceToConvention, id } = this.props

    let newSections = []
    if (field.kind === 'select_field') {
      newSections = field.document_field_values.map((el, i) => {
        const newEl = {
          ...el,
          'position': i
        }
        return newEl
      })
    }
    field['document_field_values'] = newSections
    field['column'] = column
    field['row'] = row || 0
    field['id'] = id || null

    const removeNum = id === undefined ? 0 : 1
    spliceToConvention(`column_${column}`, row || 0, removeNum, field)
    this.handleClose()
  }

  renderFieldForm = () => {
    const {
      field_type,
      handleSubmit,
      submitErrors,
      initialized,
      codification_kind,
    } = this.props

    // TODO: Change limit access for new field to
    
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className='modal-container'>
          <div className="modal-container__title-block">
            <h4>{initialized ? 'Edit input field' : 'New input field'}</h4>
            {false && <button
              type='button'
              className='btn color-blue p-0 ml-auto'
              onClick={() => this.setState({ limitAccess: true })}
            >
              Limit access
            </button>}
          </div>
          <div className="modal-container__content-block">
            <div className='form-group'>
              <Field
                component={InputField}
                name='title'
                id='title'
                placeholder='Title (e.g. Discipline)'
                label='Type in title'
                errorField={submitErrors}
                disabled={codification_kind}
                validate={[required]}
              />
            </div>
            <div className='form-group'>
              <Field
                component={InputField}
                name='command'
                id='command'
                placeholder='Command (e.g. Select discipline)'
                label='Type in command'
                errorField={submitErrors}
                disabled={codification_kind}
                validate={[required]}
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
                isDisabled={codification_kind}
                validate={[required]}
              />
            </div>
            <div className='form-group d-flex'>
              <CheckboxField
                name='required'
                checkBoxId='required'
                labelClass='form-check-label mr-2'
                text='Required field'
                disabled={codification_kind}
              />
              {field_type === 'select_field' && !codification_kind &&
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
              <div><label>Selections</label></div>
              <FieldArray
                name='document_field_values'
                component={DraggableDropDown}
              />
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
            {initialized ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    )
  }

  renderModalContent = () => {
    const { limitAccess } = this.state
    const { title } = this.props
    if (limitAccess) {
      return (
        <ModalLimitAccess
          handleBack={() => this.setState({ limitAccess: false })}
          handleClose={this.handleClose}
          title={title}
        />
      )
    }
    
    return this.renderFieldForm()
  }

  render() {
    const { modalOpen } = this.props

    return (
      <NewModal
        content={this.renderModalContent()}
        open={modalOpen}
        onClose={this.handleClose}
      />
    )
  }
}

const selector = formValueSelector('convention_input_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('convention_input_form')(state),
  field_type: selector(state, 'kind'),
  column: selector(state, 'column'),
  row: selector(state, 'row'),
  id: selector(state, 'id'),
  title: selector(state, 'title'),
  codification_kind: selector(state, 'codification_kind'),
})

const mapDispatchToProps = dispatch => ({
  destroyForm: () => dispatch(destroy('convention_input_form')),
  spliceToConvention: (field, index, removeNum, val) => dispatch(arraySplice('convention_form', field, index, removeNum, val)),
})

export default connect(
  mapStateToProps, mapDispatchToProps
  )(reduxForm({
    form: 'convention_input_form',
    validate
  })(ModalCreateField))
