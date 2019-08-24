import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  reduxForm,
  Field,
} from 'redux-form'
import { withRouter } from 'react-router-dom'
import InputField from '../../../../../elements/InputField'
import { startUpdateFolder } from '../../../../../actions/foldersActions'

// TODO: waiting backend changes

function FolderForm() {
  const dispatch = useDispatch()

  const updateFolder = useCallback(values => {
    dispatch(startUpdateFolder(values))
  }, [dispatch])

  const blurSubmit = useCallback(e => {
    e.preventDefault()
    const target = e.target

    const field = {
      document_fields: {
        codification_kind: target.id,
        value: target.value
      }
    }
    console.log(field)
    // updateFolder(field)
  }, [])

  return (
    <form className='form-group'>
      <div className='input-container'>
        <Field
          className='document-id-code'
          component={InputField}
          name='document_fields[0].value'
          id='project_code'
          placeholder='XXX'
          onBlur={blurSubmit}
        />
        <Field
          component={InputField}
          className='document-id-code'
          id='originating_company'
          name='document_fields[1].value'
          placeholder='XXX'
        />
        <Field
          component={InputField}
          className='document-id-code'
          id='discipline'
          name='document_fields[2].value'
          placeholder='XXX'
        />
        <Field
          component={InputField}
          className='document-id-code'
          id='document_type'
          name='document_fields[3].value'
          placeholder='XXX'
        />
        <Field
          component={InputField}
          className='document-id-code'
          id='document_number'
          name='document_fields[4].value'
          placeholder='XXXX'
        />
      </div>
    </form>
  )
}

export default withRouter(reduxForm({ form: 'folder_form' })(FolderForm))
