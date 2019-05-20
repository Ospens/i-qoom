import React from 'react'
import { Field } from 'redux-form'

function TextAreaField({ errorField = {}, className, label, ...input }) {
  const errorInfo = errorField[input.id]
  return (
    <div className={className}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <Field
        {...input}
        component='textarea'
        className={`form-control ${errorInfo ? ' is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default TextAreaField
