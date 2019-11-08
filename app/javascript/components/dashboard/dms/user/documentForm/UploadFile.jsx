import React from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector, Field } from 'redux-form'
import DropZoneField from '../../../../../elements/DropZoneField'
import InputField from '../../../../../elements/InputField'
import { required } from '../../../../../elements/validations'

const selector = formValueSelector('document_form')

function UploadFile() {
  const documentFields = useSelector(state => selector(state, 'document_fields'))
  if (!(documentFields && documentFields.length > 0)) return <div />

  const docFile = documentFields.find(el => el.codification_kind === 'document_native_file')
  const docIndex = documentFields.findIndex(el => el.codification_kind === 'document_native_file')

  return (
    <div >
      <div className='dms-content__header'>
        <div className='d-flex'>
          <h4>Add new revision</h4>
        </div>
      </div>

      <div className='content-body bottom-padding'>
        <div className='form-group col-6 pl-0'>
          <Field
            component={InputField}
            name='contractor'
            id='contractor'
            placeholder='Originator'
            label='Type in originator*'
            validate={[required]}
          />
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            <Field
              label={docFile.title}
              name={`document_fields[${docIndex}].value`}
              id={`document_fields[${docIndex}].value`}
              // validate={validationList(field)} 
              placeholder={docFile.command}
              component={DropZoneField}
              renameFile={true}
              filename={docFile.filename}
            />
          </div>
        </div>
      </div>

      <div className='dms-footer'>
        <button type='button' className='btn btn-white'>Cancel</button>
        <button type='submit' className='btn btn-purple' >
          Next
        </button>
      </div>
    </div>
  )
}

export default UploadFile
