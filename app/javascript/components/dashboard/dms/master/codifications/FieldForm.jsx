import React, { useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import {
  reduxForm,
  FieldArray,
  Field
} from 'redux-form'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../../../elements/InputField'
import { startUpdateCodification } from '../../../../../actions/conventionActions'

const validate = value => (!value || !value.length ? 'Required' : undefined)

const BlockByType = ({ fields, title }) => {
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
            />
            <Field
              className='codification-input'
              component={InputField}
              name={`${field}.title`}
              id='title'
              placeholder={`${title} title`}
              label={i > 0 ? '' : `Enter ${title}`}
            />
            {fields.length > 1 &&
            <button type='button' onClick={() => fields.remove(i)} className={classnames({ 'first-line': i < 1 })}>
              <span className='icon-bin-1' />
            </button>}
          </div>
        ))}
      </div>
      <button
        type='button'
        className='with-icon add-button justify-content-center'
        onClick={() => fields.push({position: 1})}>
        <span className='icon-add_1 mr-2' />
        <span data-title='Add Originating company'>Add Originating company</span>
      </button>
    </React.Fragment>
  )
}

function FieldForm({ title, form, handleSubmit, reset, pristine, match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  const document_fields = useSelector(state => state.conventions.current.document_fields)

  const submitCodification = useCallback(values => {
    const fieldIndex = document_fields.findIndex(el => el.codification_kind === form)
    
    const v = document_fields.map((item, i) => {
      if (i !== fieldIndex) return item

      item.document_field_values = values[form]
      return item
    })

    dispatch(startUpdateCodification(project_id, v))
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
          component={BlockByType}
          validate={validate}
        />
      </div>
      <div className='codification-codes-values-column__footer'>
        <button type='button' className='btn btn-white' onClick={reset} disabled={pristine}>Discard</button>
        <button type='submit' className='btn btn-purple'>Save</button>
      </div>
    </form>
  )
}

export default withRouter(reduxForm()(FieldForm))
