import React from 'react'
import classnames from 'classnames'

function CheckBoxField({
  input,
  id,
  className,
  labelClass,
  label,
  text,
  type,
  meta: { touched, error },
  ...props
}) {
  const mainClass = classnames('checkbox-field', className)
  return (
    <div className={mainClass}>
      <input
        {...input}
        {...props}
        id={id}
        checked={input.value}
        type="checkbox"
        component="input"
        className={`form-control checkbox-input ${touched && error ? ' is-invalid' : ''}`}
      />
      <label className={labelClass} htmlFor={id} />
      <label htmlFor={id} className="text-label">{text}</label>
      {touched && error
        && (
          <div className="input-feedback-text invalid">
            {error}
          </div>
        )}
    </div>
  )
}

export default CheckBoxField
