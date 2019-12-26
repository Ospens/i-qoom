import React from 'react'

const TextAreaField = ({
  input,
  errorField = {},
  className,
  label,
  meta: { touched, error },
  ...props
}) => {
  const errorInfo = errorField[input.name]

  return (
    <div className={className}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <textarea
        {...input}
        {...props}
        className={`form-control ${errorInfo || (touched && error) ? ' is-invalid' : ''}`}
        required
        pattern=".*\S.*"
      />
      {touched && (error || errorInfo) &&
        <div className='input-feedback-text invalid'>
          {error
            ? error
            : errorInfo
              ? errorInfo[0]
              : ''}
        </div>}
    </div>
  )
}

export default TextAreaField
