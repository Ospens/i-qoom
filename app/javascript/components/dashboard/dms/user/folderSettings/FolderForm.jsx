import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  reduxForm,
  Field,
  getFormValues
} from 'redux-form'
import { withRouter } from 'react-router-dom'
import InputField from '../../../../../elements/InputField'
import { startUpdateFolder } from '../../../../../actions/foldersActions'

const findFieldIndex = (fields, kind) => fields ? fields.findIndex(f => f.codification_kind === kind) : undefined

function FolderForm() {
  const dispatch = useDispatch()
  const formValues = useSelector(state => getFormValues('folder_form')(state)) || {}
  const fields = formValues.document_fields

  const updateFolder = useCallback(values => {
    dispatch(startUpdateFolder(values))
  }, [dispatch])

  const blurSubmit = useCallback(e => {
    e.preventDefault()

    updateFolder(formValues)
  }, [formValues])

  return (
    <form noValidate={true} className='form-group'>
      <div className='input-container'>
        <Field
          className='document-id-code'
          component={InputField}
          name='document_fields.value'
          id='project_code'
          placeholder='XXX'
          disabled={true}
        />
        <Field
          component={InputField}
          className='document-id-code'
          name={`document_fields[${findFieldIndex(fields, 'originating_company')}].value`}
          placeholder='XXX'
          onBlur={blurSubmit}
        />
        <Field
          component={InputField}
          className='document-id-code'
          name={`document_fields[${findFieldIndex(fields, 'discipline')}].value`}
          placeholder='XXX'
          onBlur={blurSubmit}
        />
        <Field
          component={InputField}
          className='document-id-code'
          name={`document_fields[${findFieldIndex(fields, 'document_type')}].value`}
          placeholder='XXX'
          onBlur={blurSubmit}
        />
        <Field
          component={InputField}
          className='document-id-code'
          name={`document_fields[${findFieldIndex(fields, 'document_number')}].value`}
          placeholder='XXX'
          onBlur={blurSubmit}
        />
      </div>
    </form>
  )
}

export default withRouter(reduxForm({ form: 'folder_form' })(FolderForm))
