import React, { useCallback, useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  reduxForm,
  FieldArray,
  Field
} from 'redux-form'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import { startUpdateCodification } from '../../../../../actions/conventionActions'
import { required } from '../../../../../elements/validations'
import { errorNotify } from '../../../../../elements/Notices'

const validate = value => !value || !value.length ? 'Required' : undefined
const uniq = values => {
  if (!values) return undefined
  const codes = values.map(el => el.value)
  
  return (new Set(codes)).size !== codes.length ? 'Please use unique values' : undefined
}

export const InputField = ({
  input,
  className,
  label,
  type,
  isForm,
  popupClassName,
  msg,
  errors,
  meta: { touched, error },
  ...props
}) => {
  if (!isForm) {
    return (
      <div className={classnames(className, { 'full-wide': props.id !== 'value' })}>
        {label && <label htmlFor={input.id}>{label}</label>}
        <div className='codification-input_value-block'>{input.value}</div>
      </div>
    )
  }
  const inputElement = (
    <input
      {...input}
      {...props}
      type={type ? type : 'text'}
      className={classnames('form-control', { 'is-invalid': touched && error })}
      required
      pattern=".*\S.*"
    />
  )

  return (
    <div className={className}>
      {label && <label htmlFor={input.id}>{label}</label>}
      {props.id === 'value' // || props.id.includes('project_code')
        ? inputElement
        : <Popup
            className={classnames(popupClassName, { 'error-tooltip-container' : (touched && errors) }, { 'dark-tooltip-container': (!touched && errors) })}
            trigger={inputElement}
            position='right center'
            open={!!(touched && error) || (touched && props.id.includes('project_code') && !!errors) || (!touched && !!errors) }
          >
            <div className='tooltip-block dark'>
              <div className='tooltip-text-block'>
                <span>
                  {msg || 'Add at least one'}
              </span>
              </div>
            </div>
          </Popup>}
    </div>
  )
}

const CodeList = ({ fields, title, meta, isForm }) => {
  meta.error ? errorNotify(meta.error) : {}

  return (
    <React.Fragment>
      <div>
        {fields.map((field, i) => (
          <div className='codification-input-group' key={i}>
            <Field
              className='codification-input'
              component={InputField}
              name={`${field}.value`}
              id='value'
              placeholder='XXX'
              label={i > 0 ? '' : 'Code'}
              validate={[required]}
              maxLength='3'
              isForm={isForm}
            />
            <Field
              className='codification-input'
              component={InputField}
              name={`${field}.title`}
              id='title'
              placeholder={`${title} title`}
              label={i > 0 ? '' : `Enter ${title}`}
              validate={[required]}
              isForm={isForm}
            />
            {fields.length > 1 && isForm &&
            <button type='button' onClick={() => fields.remove(i)} className={classnames({ 'first-line': i < 1 })}>
              <span className='icon-bin-1' />
            </button>}
          </div>
        ))}
      </div>
      {isForm &&
      <button
        type='button'
        className='with-icon add-button justify-content-center'
        onClick={() => fields.push({position: 1})}>
        <span className='icon-add_1 mr-2' />
        <span data-title='Add Originating company'>Add {title}</span>
      </button>}
    </React.Fragment>
  )
}

function FieldForm({ title, form, handleSubmit, reset, pristine, match: { params: { project_id } } }) {
  const [isForm, toggleIsForm] = useState(false)
  const dispatch = useDispatch()
  const document_fields = useSelector(state => state.conventions.current.document_fields)

  const submitCodification = useCallback(values => {
    const fieldIndex = document_fields.findIndex(el => el.codification_kind === form)
    
    const v = document_fields.map((item, i) => {
      if (i !== fieldIndex) return item

      item.document_field_values = values[form]
      return item
    })

    dispatch(startUpdateCodification(project_id, v)).then(() => toggleIsForm(false))
  }, [dispatch, document_fields])

  return (
    <form
      noValidate={true}
      className={classnames('codification-codes-values-block', form)}
      onSubmit={handleSubmit(submitCodification)}
    >
      <div className='codification-codes-values-block__title'>{title}</div>
      <div className='codification-codes-values-block__values-list'>
        <FieldArray
          title={title}
          name={form}
          component={CodeList}
          validate={[validate, uniq]}
          isForm={isForm}
        />
      </div>
      <div className='codification-codes-values-column__footer'>
        {isForm
        ? <React.Fragment>
            <button type='button' className='btn btn-white' onClick={reset} disabled={pristine}>Discard</button>
            <button type='submit' className='btn btn-purple'>Save</button>
          </React.Fragment>
          : <button onClick={() => toggleIsForm(true)} type='button' className='btn btn-purple full-wide'>Edit</button>}
      </div>
    </form>
  )
}

export default withRouter(reduxForm()(FieldForm))
