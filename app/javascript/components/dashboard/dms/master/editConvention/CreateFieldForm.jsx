import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field,
  FieldArray,
  arraySplice,
  arrayPush
} from 'redux-form'
import DraggableDropDown from './DraggableDropDown'
import InputField from '../../../../../elements/InputField'
import SelectField from '../../../../../elements/SelectField'
import dropdownIcon from '../../../../../images/form_1.svg'
import textIcon from '../../../../../images/form_2.svg'
import textareaIcon from '../../../../../images/form_3.svg'
import uploadIcon from '../../../../../images/form_4.svg'
import dateIcon from '../../../../../images/form_5.svg'
import { required } from '../../../../../elements/validations'
import CheckBoxField from '../../../../../elements/CheckBoxField'

const selector = formValueSelector('convention_input_form')

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

const validate = values => {
  const errors = {}
  if (values.kind === 'select_field'
    && ((values.document_field_values && values.document_field_values.length < 1)
      || !values.document_field_values)
  ) {
    errors.new_section = 'Add some value'
  }
  return errors
}

function CreateFieldForm({ handleSubmit, initialized, handleClose }) {
  const dispatch = useDispatch()
  const submitErrors = useSelector(state => getFormSubmitErrors('convention_input_form')(state))
  const fieldType = useSelector(state => selector(state, 'kind'))
  const column = useSelector(state => selector(state, 'column')) || 2
  const row = useSelector(state => selector(state, 'row'))
  const createdAt = useSelector(state => selector(state, 'created_at'))
  const codificationKind = useSelector(state => selector(state, 'codification_kind'))
  // TODO: Change limit access for new field to
  const onSubmit = useCallback(field => {
    let newSections = []
    if (field.kind === 'select_field') {
      newSections = field.document_field_values.map((el, i) => {
        const newEl = {
          ...el,
          position: i
        }
        return newEl
      })
    }
    field.document_field_values = newSections
    field.column = column
    field.row = row || 0
    field.created_at = new Date()
    const removeNum = createdAt === undefined ? 0 : 1
    if (createdAt === undefined) {
      dispatch(arrayPush('convention_form', `column_${column}`, field))
    } else {
      dispatch(arraySplice('convention_form', `column_${column}`, row || 0, removeNum, field))
    }
    handleClose()
  }, [dispatch, column, createdAt, handleClose, row])

  return (
    <form noValidate className="new-modal" onSubmit={handleSubmit(onSubmit)}>
      <div className="new-modal__header">
        <h6>{initialized ? 'Edit input field' : 'New input field'}</h6>
      </div>
      <div className="new-modal__body">
        <div className="modal-container__content-block">
          <div className="form-group">
            <Field
              component={InputField}
              name="title"
              id="title"
              placeholder="Title (e.g. Discipline)"
              label="Type in title"
              errorField={submitErrors}
              disabled={codificationKind}
              validate={[required]}
            />
          </div>
          <div className="form-group">
            <Field
              component={InputField}
              name="command"
              id="command"
              placeholder="Command (e.g. Select discipline)"
              label="Type in command"
              errorField={submitErrors}
              disabled={codificationKind}
              validate={[required]}
            />
          </div>

          <div className="form-group">
            <Field
              name="kind"
              id="kind"
              label="Choose field type"
              placeholder="Field type"
              defaultValue={typeVariants[0]}
              options={typeVariants}
              component={SelectField}
              errorField={submitErrors}
              disabled={codificationKind}
              validate={[required]}
            />
            <div className="d-flex checkboxes-row">
              <Field
                component={CheckBoxField}
                id="required"
                name="required"
                labelClass="form-check-label mr-2"
                text="Required field"
                className="d-flex justify-content-center"
                disabled={codificationKind}
              />
              {fieldType === 'select_field'
              && (
                <Field
                  component={CheckBoxField}
                  id="enable_multi_selections"
                  name="enable_multi_selections"
                  labelClass="form-check-label mx-2"
                  text="Enable multi selections"
                  className="d-flex justify-content-center"
                  disabled={codificationKind}
                />
              )
              }
            </div>
          </div>
          {fieldType === 'select_field'
          && (
            <div>
              <FieldArray
                name="document_field_values"
                component={DraggableDropDown}
              />
            </div>
          )}
        </div>
      </div>
      <div className="new-modal__footer">
        <button
          type="button"
          className="btn btn-white"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-purple">
          {initialized ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'convention_input_form', validate })(CreateFieldForm)
