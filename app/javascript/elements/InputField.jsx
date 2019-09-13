import React from 'react'

const InputField = ({
  input,
  errorField = {},
  className,
  label,
  type,
  meta: { touched, error },
  ...props
}) => {
  const errorInfo = errorField[input.name]
  return (
    <div className={className}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input
        {...input}
        {...props}
        type={type ? type : 'text'}
        className={`form-control ${errorInfo || (touched && error) ? ' is-invalid' : ''}`}
        required
        pattern=".*\S.*"
      />
      {touched &&
      <div className='invalid-feedback'>
      {error
        ? error
        : errorInfo
          ? errorInfo
          : ''}
      </div>}
    </div>
  )
}

export default InputField
