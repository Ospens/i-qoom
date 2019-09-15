import React from 'react'
import {
  reduxForm,
  Field
} from 'redux-form'
import InputField from '../../../../elements/InputField'
import { required } from '../../../../elements/validations'

function FieldForm({ initialized, handleSubmit, type, submitForm }) {
  const title = initialized
    ? `Edit the ${type}`
    : `Create a  ${type}`

  return (
    <form noValidate={true} onSubmit={handleSubmit(submitForm)} className='new-modal'>
      <div className='new-modal__header'>
        <h4 className='pb-4'>{title}</h4>
      </div>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title'>{`What would you like to call this ${type}?`}</h6>
        <Field
          component={InputField}
          name='title'
          className='form-group'
          label={`Please enter a ${type} name`}
          validate={[required]}
        />
      </div>
      <div className='new-modal__footer'>
        <button type='submit' className='btn btn-purple'>
          Save
        </button>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'field_form' })(FieldForm)
