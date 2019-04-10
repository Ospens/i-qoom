import React from 'react'
import { Field } from 'redux-form'

function InputField({errorField, label, ...input}) {
  return (
    <div>
      <label htmlFor='first_name'>{label}</label>
      <Field
        {...input}
        component='input'
        className={`form-control ${errorField[input.id] ? ' is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>
        {errorField[input.id] ? errorField[input.id][0] : ''}
      </div>
    </div>
  )
}

export default InputField
