import React, { Fragment, useEffect } from 'react'
import classnames from 'classnames'

export function feedBackText(text, isError) {
  return (
    <div className={classnames('input-feedback-text', { invalid: isError })}>
      {text}
    </div>
  )
}

const InputField = ({
  input,
  errorField = {},
  className,
  label,
  type,
  justHightlight = false,
  isDirty,
  infoFeedback,
  meta: { touched, error, dirty },
  ...props
}) => {
  useEffect(() => {
    if (!isDirty) return

    isDirty(dirty)
  }, [dirty])

  const errorInfo = errorField[input.name]
  return (
    <div className={className}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...input}
        {...props}
        type={type || 'text'}
        className={classnames('form-control', { 'is-invalid': errorInfo || (touched && error) })}
        required
        pattern=".*\S.*"
      />
      {(() => {
        if (touched && !justHightlight) {
          if (error || errorInfo) {
            const text = error || errorInfo || ''
            return feedBackText(text, true)
          } if (infoFeedback) {
            return feedBackText(infoFeedback)
          }
        }
        return <Fragment />
      })()}
    </div>
  )
}

export default InputField
