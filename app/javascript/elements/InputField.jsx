import React from 'react'
import { Field } from 'redux-form'

function InputField({ errorField = {}, className, label, ...input }) {
  const errorInfo = errorField[input.id]
  return (
    <div className={className}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <Field
        {...input}
        component='input'
        className={`form-control ${errorInfo ? ' is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default InputField
