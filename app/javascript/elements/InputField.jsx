import React from 'react'
import classnames from 'classnames'

const InputField = ({
  input,
  errorField = {},
  className,
  label,
  type,
  justHightlight = false,
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
        className={classnames('form-control', { 'is-invalid': errorInfo || (touched && error) })}
        required
        pattern=".*\S.*"
      />
      {touched && !justHightlight &&
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
