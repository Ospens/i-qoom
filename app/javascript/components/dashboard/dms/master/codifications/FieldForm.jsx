import React, { useCallback, useState, useEffect } from 'react'
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

const validate = value => !value || !value.length ? 'Required' : undefined

const uniq = (_, allValues) => {
  const v = allValues[Object.keys(allValues)[0]]
  const codes = v.map(el => el.value)
  codes.forEach((element, i) => {
    if (!(element === undefined || element === null)) return
    codes.splice(i, 1)
  })
  
  return (new Set(codes)).size !== codes.length ? 'Please use unique values' : undefined
}

const atLeastTwo = (_, allValues) => {
  const value = allValues[Object.keys(allValues)[0]]
  const isEmpty = value.map(el => Object.entries(el).length === 0 && el.constructor === Object)
  return isEmpty.includes(true) ? 'Add at least one' : undefined
}

export const InputField = ({
  input,
  className,
  label,
  type,
  isForm,
  popupClassName,
  dmsSections,
  msg,
  projectCode,
  meta: { touched, error },
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [oldnSBState, setoldnSBState] = useState(true)
  const openSB = useSelector(({ projects }) => projects.sidebar)

  useEffect(() => {
    if (openSB === oldnSBState) return

    setTimeout(function () {
      setoldnSBState(openSB)
    }, 500)
  }, [openSB])

  useEffect(() => {
    const condition = projectCode && !dmsSections && (!!(touched && error) || (!touched && !!error)) 
    setOpen(condition)
  }, [projectCode, dmsSections, touched, error])

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
      {props.id === 'value'
        ? inputElement
        : <Popup
            className={classnames(popupClassName, { 'error-tooltip-container': touched && error }, { 'dark-tooltip-container': !touched && error })}
            trigger={inputElement}
            on='click'
            position='right center'
            open={(oldnSBState === openSB) && open}
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

const CodeList = ({ fields, title, isForm, projectCode, dmsSections }) => {
  return (
    <React.Fragment>
      <div>
        {fields.map((field, i) => {
          const validateTitle = i === 1 ? [required, uniq, atLeastTwo] : [required, uniq]

          return (
            <div className='codification-input-group' key={i}>
              <Field
                className='codification-input'
                component={InputField}
                name={`${field}.value`}
                id='value'
                placeholder='XXX'
                label={i > 0 ? '' : 'Code'}
                validate={[required, uniq]}
                maxLength='3'
                isForm={isForm}
                projectCode={projectCode}
                disabled={!projectCode}
              />
              <Field
                className='codification-input'
                component={InputField}
                popupClassName='for-codification'
                name={`${field}.title`}
                id='title'
                placeholder={`${title} title`}
                label={i > 0 ? '' : `Enter ${title}`}
                validate={validateTitle}
                isForm={isForm}
                projectCode={projectCode}
                dmsSections={dmsSections}
                disabled={!projectCode}
              />
              {fields.length > 2 && isForm &&
              <button type='button' onClick={() => fields.remove(i)} className={classnames({ 'first-line': i < 1 })}>
                <span className='icon-bin-1' />
              </button>}
            </div>
        )})}
      </div>
      {isForm &&
      <button
        type='button'
        className='with-icon add-button justify-content-center'
        onClick={() => fields.push({ position: fields.length + 1 })}
        disabled={!projectCode}
      >
        <span className='icon-add_1 mr-2' />
        <span data-title='Add Originating company'>Add {title}</span>
      </button>}
    </React.Fragment>
  )
}

function FieldForm({ title, form, handleSubmit, viewOnly, reset, pristine, match: { params: { project_id } } }) {
  const [isForm, toggleIsForm] = useState(false)
  const dispatch = useDispatch()
  const documentFields = useSelector(state => state.conventions.current.document_fields)
  const dmsSections = useSelector(state => state.projects.current.dmsSections)
  const projectCode = useSelector(state => state.projects.current.project_code)

  useEffect(() => {
    if (dmsSections !== undefined && !dmsSections) {
      toggleIsForm(true)
    }
  }, [dmsSections])

  const submitCodification = useCallback(values => {
    const fieldIndex = documentFields.findIndex(el => el.codification_kind === form)
    
    const v = documentFields.map((item, i) => {
      item.document_field_values = item.document_field_values.filter(({ title, value, position }) => title && value && position)
      if (i !== fieldIndex) return item

      item.document_field_values = values[form]
      item.document_field_values = item.document_field_values.map(v => ({ ...v, value: v.value.toUpperCase() }))
      return item
    })

    dispatch(startUpdateCodification(project_id, v)).then(() => toggleIsForm(false))
  }, [dispatch, documentFields])

  return (
    <form
      noValidate={true}
      className={classnames('codification-codes-values-block', form, { 'disabled': !projectCode })}
      onSubmit={handleSubmit(submitCodification)}
    >
      <div className='codification-codes-values-block__title'>{title}</div>
      <div className='codification-codes-values-block__values-list'>
        <FieldArray
          title={title}
          name={form}
          component={CodeList}
          validate={[validate]}
          isForm={isForm}
          projectCode={projectCode}
          dmsSections={dmsSections}
        />
      </div>
      {!viewOnly &&
      <div className='codification-codes-values-column__footer'>
        {isForm
        ? <React.Fragment>
            <button type='button' className='btn btn-white' onClick={reset} disabled={pristine}>Discard</button>
            <button type='submit' className='btn btn-purple' disabled={!projectCode}>Save</button>
          </React.Fragment>
          : <button onClick={() => toggleIsForm(true)} type='button' className='btn btn-purple full-wide'>Edit</button>}
      </div>}
    </form>
  )
}

const submitCodification = () => { console.log() } // submit function must be passed to onSubmit

export default withRouter(reduxForm({
  onSubmit: submitCodification // submit function must be passed to onSubmit
})(FieldForm))
