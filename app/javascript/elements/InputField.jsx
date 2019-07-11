import React from 'react'

const InputField = ({ input, errorField = {}, readOnly = false, className, label, type, ...props }) => {
  const errorInfo = errorField[input.name]
  return (
    <div className={className}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <input
        {...input}
        {...props}
        type={type ? type : 'text'}
        className={`form-control ${errorInfo ? ' is-invalid' : ''}`}
        readOnly={readOnly}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default InputField
