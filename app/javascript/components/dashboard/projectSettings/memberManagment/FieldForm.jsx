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
    <form onSubmit={handleSubmit(submitForm)} >
      <div className='modal-container'>
        <div className='modal-container__title-block'>
          <h4 className='pb-4'>{title}</h4>
        </div>
        <h3>{`What would you like to call this ${type}?`}</h3>
        <Field
          component={InputField}
          name='title'
          className='form-group'
          label={`Please enter a ${type} name`}
          validate={[required]}
        />
      </div>
      <div className='modal-footer'>
        <button type='submit' className='btn btn-purple'>
          Save
        </button>
      </div>
    </form>
  )
}

export default reduxForm({ form: 'field_form' })(FieldForm)
