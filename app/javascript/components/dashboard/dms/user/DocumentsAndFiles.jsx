import React from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  getFormSubmitErrors,
  formValueSelector,
  Field,
  change
} from 'redux-form'
import SelectField from '../../../../elements/SelectField'
import CheckboxField from '../../../../elements/CheckboxField'
import DatePickerField from '../../../../elements/DatePickerField'
import DropZoneField from '../../../../elements/DropZoneField'
import InputField from '../../../../elements/InputField'
import TextAreaField from '../../../../elements/TextAreaField'
import { required } from '../../../../elements/validations'

// TODO: rewrite this method

const updateDocFieldValues = (value, fieldValues, changeValues) => {
  const newValues = fieldValues.map(field => {
    const selected = field.value == value
    return {
      ...field,
      selected
    }
  })
  changeValues(newValues)
}

function InputByType({ field }) {
  const uniqName = `document_fields[${field.index}].value`

  if (field.kind === 'upload_field') {
    return (
      <Field
        name={`document_fields[${field.index}].file`}
        id={`document_fields[${field.index}].file`}
        component={DropZoneField}
        label={field.title}
        validate={field.required ? [required] : []}
      />
    )
  } else if (field.kind === 'select_field') {
    const fieldValues = field.document_field_values
    const dispatch = useDispatch()
    const changeValues = (values) => {
      dispatch(
        change(
          'document_form',
          `document_fields[${field.index}].document_field_values`,
          values
        )
      )
    }
    return (
      <Field
        name={uniqName}
        id={uniqName}
        options={fieldValues}
        onChange={v => updateDocFieldValues(v, fieldValues, changeValues)}
        placeholder={field.command}
        component={SelectField}
        label={field.title}
        validate={field.required ? [required] : []}
      />
    )
  } else if (field.kind === 'textarea_field') {
    return (
      <Field
        component={TextAreaField}
        name={uniqName}
        id={uniqName}
        placeholder={field.command}
        label={field.title}
        validate={field.required ? [required] : []}
      />
    )
  } else if (field.kind === 'date_field') {
    return (
      <Field
        name={uniqName}
        id={uniqName}
        placeholder={field.command}
        component={DatePickerField}
        label={field.title}
        validate={field.required ? [required] : []}
      />
    )
  } else {
    return (
      <Field
        component={InputField}
        name={uniqName}
        id={uniqName}
        placeholder={field.command}
        label={field.title}
        validate={field.required ? [required] : []}
      />
    )
  }
}

const formvalue = (fields = [], codKind) => {
  if (fields.length < 1) return ''

  const field = fields.filter(values => values.codification_kind === codKind)[0]
  if (!field) return ''

  return field.value

}

function DocumentsAndFiles({ submitErrors, documentFields, groupedFields }) {

  const origCompanyValue = formvalue(documentFields, 'originating_company')
  const disciplineValue = formvalue(documentFields, 'discipline')
  const docTypeValue = formvalue(documentFields, 'document_type')
  const docNumberValue = formvalue(documentFields, 'document_number')

  return (
    <React.Fragment>
      <div className='dms-content__header p-4'>
        <h4>Add documents data & files</h4>
        <div className='dms-content__project-phases'>
          <span>Project phases</span>
          <ul className='row mx-0'>
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
          </ul>
        </div>
      </div>

      <div className='form-body p-4'>
        <div className='row new-document-table'>

          <div className='col-6'>
            <div className='form-group'>
              <label>Pleace select or generate Document ID</label>

              <div className='input-container'>
                <div className='document-id-code'>
                  <input
                    className='form-control'
                    type='text'
                    id='document_id_name'
                    value='MWP'
                    disabled
                  />
                </div>
                <div className='document-id-code'>
                  <input
                    className='form-control'
                    type='text'
                    id='document_id_orig_company'
                    placeholder='XXX'
                    value={origCompanyValue || ''}
                    disabled
                  />
                </div>
                <div className='document-id-code'>
                  <input
                    className='form-control'
                    type='text'
                    id='document_id_discipline'
                    placeholder='XXX'
                    value={disciplineValue || ''}
                    disabled
                  />
                </div>
                <div className='document-id-code'>
                  <input
                    className='form-control'
                    type='text'
                    id='document_id_doc_type'
                    placeholder='XXX'
                    value={docTypeValue || ''}
                    disabled
                  />
                </div>
                <div className='document-id-code'>
                  <input
                    className='form-control'
                    type='text'
                    id='document_id_doc_number'
                    placeholder='XXX'
                    value={docNumberValue || ''}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className='form-group'>
              <CheckboxField
                name='generate_id'
                checkBoxId='generate_id'
                labelClass='form-check-label mr-2'
                text='Generate Document ID through file code'
                errorField={submitErrors}
              />
            </div>
            {groupedFields[1].map((field, index) => (
              <div className='form-group' key={index}>
                <InputByType field={field} />
              </div>
            ))}

          </div>

          <div className='col-6'>
            {groupedFields[2].map((field, index) => (
              <div className='form-group' key={index}>
                <InputByType field={field}/>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='dms-footer'>
        <button type='button' className='btn btn-white'>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

const selector = formValueSelector('document_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('document_form')(state),
  groupedFields: state.documents.documentFields.grouped_fields,
  documentFields: selector(state, 'document_fields')
})

export default connect(mapStateToProps)(DocumentsAndFiles)
