import React from 'react'
import { Field } from 'redux-form'

function Checkbox({ text, checkBoxId, inputClass, labelClass, onChange, name, errorField }) {
  const errorInfo = errorField[checkBoxId]
  return (
    <div>
      <input
        type='checkbox'
        className={`form-check-input ${errorInfo ? ' is-invalid' : ''}`}
        id={checkBoxId}
        onChange={onChange}
        name={name}
      />
      <label className={labelClass} htmlFor={checkBoxId}></label>
      <span>{text}</span>
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default Checkbox
