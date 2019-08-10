import React from 'react'

function CheckField({
  input,
  className,
  labelClass,
  label,
  text,
  type,
  meta: { touched, error },
  ...props
}) {
  return (
    <div className={className}>
      <input
        {...input}
        {...props}
        type='checkbox'
        component='input'
        className={`form-control checkbox-input ${touched && error ? ' is-invalid' : ''}`}
      />
      <label className={labelClass} htmlFor={input.name} />
      <span>{text}</span>
      {touched && error &&
        <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export default CheckField
