import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  formValueSelector,
  Field,
  change,
  touch,
  initialize
} from 'redux-form'
import { Link, withRouter } from 'react-router-dom'
import DocIdModal from '../../DocIdModal'
import SelectField from '../../../../../elements/SelectField'
import CheckboxField from '../../../../../elements/CheckboxField'
import DatePickerField from '../../../../../elements/DatePickerField'
import DropZoneField from '../../../../../elements/DropZoneField'
import InputField from '../../../../../elements/InputField'
import TextAreaField from '../../../../../elements/TextAreaField'
import { required, maxLength4, maxLength2, minLength2, minLength4 } from '../../../../../elements/validations'
import { initValues } from '../../initDocId'
import DocumentIdInputs from '../../DocumentIdInputs'
import { addNotification } from '../../../../../actions/notificationsActions'

const codificationString = [
  'originating_company',
  'discipline',
  'document_type',
  'revision_number',
  'document_number'
]

const selector = formValueSelector('document_form')

const validationList = field => {
  const list = []
  if (field.required) {
    list.push(required)
  }
  if ('document_number' === field.codification_kind) {
    list.push(maxLength4, minLength4)
  }
  if ('revision_number' === field.codification_kind) {
    list.push(maxLength2, minLength2)
  }
  return list
}

function InputByType({ field, modal, toggleModal, conventionId, changeValues, blurPadStart }) {
  const uniqName = `document_fields[${field.index}].value`
  const disabled = conventionId && codificationString.includes(field.codification_kind)

  const commonProps = {
    label: field.title,
    name: uniqName,
    id: uniqName,
    validate: validationList(field),
    placeholder: field.command,
    disabled
  }
  if (field.codification_kind === 'document_number') {
    commonProps.onBlur = v => blurPadStart(field.index, 4, v)
  }
  if (field.codification_kind === 'revision_number') {
    commonProps.onBlur = v => blurPadStart(field.index, 2, v)
  }

  if (field.kind === 'upload_field' && field.codification_kind === 'document_native_file') {
    return (
      <React.Fragment>
        {modal && <DocIdModal toggleModal={toggleModal} open={modal}/>}
        <Field
          {...commonProps}
          component={DropZoneField}
          filename={field.filename}
          name={`document_fields[${field.index}].file`}
          id={`document_fields[${field.index}].file`}
        />
      </React.Fragment>
    )
  } else if (field.kind === 'upload_field') {
    return (
      <Field
        {...commonProps}
        component={DropZoneField}
        filename={field.filename}
        name={`document_fields[${field.index}].file`}
        id={`document_fields[${field.index}].file`}
      />
    )
  } else if (field.kind === 'select_field') {
    const fieldValues = field.document_field_values

    return (
      <Field
        {...commonProps}
        component={SelectField}
        options={fieldValues}
        onChange={v => changeValues(v, fieldValues, field.index)}
      />
    )
  } else if (field.kind === 'textarea_field') {
    return (
      <Field
        {...commonProps}
        component={TextAreaField}
      />
    )
  } else if (field.kind === 'date_field') {
    return (
      <Field
        {...commonProps}
        component={DatePickerField}
      />
    )
  } else {
    return (
      <Field
        {...commonProps}
        type={['document_number', 'revision_number'].includes(field.codification_kind) ? 'number' : 'text' }
        component={InputField}
      />
    )
  }
}

export const formvalue = (fields = [], codKind) => {
  if (fields.length < 1) return ''

  const field = fields.filter(values => values.codification_kind === codKind)[0]
  if (!field) return ''

  if (codKind === 'document_native_file') return field.file

  return field.value
}

function DocumentsAndFiles({ match: { params: { projectId } } }) {
  const [modal, toggleModal] = useState(false)
  const groupedFields = useSelector(state => state.documents.current.grouped_fields)
  const documentFields = useSelector(state => selector(state, 'document_fields'))
  const conventionId = useSelector(state => selector(state, 'convention_id'))

  const origCompanyValue = formvalue(documentFields, 'originating_company')
  const disciplineValue = formvalue(documentFields, 'discipline')
  const docTypeValue = formvalue(documentFields, 'document_type')
  const docNumberValue = formvalue(documentFields, 'document_number')
  const docFile = formvalue(documentFields, 'document_native_file')
  const generateId = useSelector(state => selector(state, 'generate_id'))
  const columns = Object.keys(groupedFields)
  const dispatch = useDispatch()

  // Select options haven't ids

  const changeValues = useCallback((value, fieldValues, index) => {
    const newValues = fieldValues.map(field => {
      const selected = field.value == value
      return {
        ...field,
        selected
      }
    })
    dispatch(change('document_form', `document_fields[${index}].document_field_values`, newValues))
  }, [dispatch])

  const blurPadStart = useCallback((index, padStart, event) => {
    event.preventDefault()
    const newValue = String(event.target.value).padStart(padStart, 0)
    dispatch(change('document_form', `document_fields[${index}].value`, newValue))
    dispatch(touch('document_form', `document_fields[${index}].value`))
  }, [dispatch])

  const initDocIdForm = useCallback(values => {
    dispatch(initialize('doc_id_form', values))
  }, [dispatch])

  useEffect(() => {
    if (modal) {
      toggleModal(false)
      return
    }
    if (!generateId) return

    const infoMsg = title => dispatch(addNotification({
      title: 'Documents',
      text: `Can not get data from title ${title}`,
      type: 'info'
    }))

    const values = initValues(documentFields, (title) => infoMsg(title))
    if (!values) return

    initDocIdForm(values)
    toggleModal(true)
  }, [docFile])

  return (
    <React.Fragment>
      <div className='dms-content__header'>
        <h4>Add documents data & files</h4>
        <div className='dms-content__project-phases'>
          <span>Project phases</span>
          <ul className='row mx-0'>
            <li className='col-3 active'>
              <button type='button'>
                Planning
              </button>
            </li>
            <li className='col-3'>
              <button type='button'>
                Development
              </button>
            </li>
            <li className='col-3'>
              <button type='button'>
                Execution
              </button>
            </li>
            <li className='col-3'>
              <button type='button'>
                Operation
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='form-body'>
        <div className='row new-document-table'>

          <div className='col-6'>
            <DocumentIdInputs
              origCompanyValue={origCompanyValue}
              disciplineValue={disciplineValue}
              docTypeValue={docTypeValue}
              docNumberValue={docNumberValue}
            />
            <div className='form-group'>
              <CheckboxField
                name='generate_id'
                checkBoxId='generate_id'
                labelClass='form-check-label mr-2'
                text='Generate Document ID through file code'
              />
            </div>
            {groupedFields[columns[0]].map((field, index) => (
              <div className='form-group' key={index}>
                <InputByType
                  modal={modal}
                  toggleModal={toggleModal}
                  field={field}
                  conventionId={conventionId}
                  changeValues={changeValues}
                  blurPadStart={blurPadStart}
                />
              </div>
            ))}

          </div>

          <div className='col-6'>
            <Field
              component={InputField}
              name='title'
              id='title'
              label='Define a document title'
              placeholder='Title'
              className='form-group'
              validate={[required]}
            />
            {groupedFields[columns[1]].map((field, index) => (
              <div className='form-group' key={index}>
                <InputByType
                  modal={modal}
                  toggleModal={toggleModal}
                  field={field}
                  conventionId={conventionId}
                  changeValues={changeValues}
                  blurPadStart={blurPadStart}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='dms-footer'>
        <Link className='btn btn-white' to={`/dashboard/projects/${projectId}/documents/`}>Cancel</Link>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

export default withRouter(DocumentsAndFiles)
