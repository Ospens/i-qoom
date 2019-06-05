import React from 'react'
import { Field } from 'redux-form'

function CheckboxField({ text, checkBoxId, labelClass, errorField, ...input }) {
  const errorInfo = errorField ? errorField[checkBoxId] : undefined
  return (
    <div className='checkbox-field justify-content-center'>
      <Field
        {...input}
        id={checkBoxId}
        type='checkbox'
        component='input'
        className={`form-check-input ${errorInfo ? ' is-invalid' : ''}`}
      />
      <label className={labelClass} htmlFor={checkBoxId}></label>
      <span>{text}</span>
      {errorInfo &&
      <div className='invalid-feedback'>
        {errorInfo[0]}
      </div>}
    </div>
  )
}

export default CheckboxField
