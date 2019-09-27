import React from 'react'
import {
  reduxForm,
  FieldArray,
  Field
} from 'redux-form'
import classnames from 'classnames'
import InputField from '../../../../../elements/InputField'

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
            />
            <Field
              className='codification-input'
              component={InputField}
              name={`${field}.title`}
              id='title'
              placeholder={`${title} title`}
            />
            <button type='button' onClick={() => fields.remove(i)}>
              <span className='icon-bin-1' />
            </button>
          </div>
        ))}
      </div>
      <button
        type='button'
        className='with-icon add-button justify-content-center'
        onClick={() => fields.push()}>
        <span className='icon-add_1 mr-2' />
        <span data-title='Add Originating company'>Add Originating company</span>
      </button>
    </React.Fragment>
  )
}

function FieldForm({ title, form, handleSubmit, reset, pristine }) {
  return (
    <form onSubmit={handleSubmit} className={classnames('codification-codes-values-block', form)}>
      <div className='codification-codes-values-block__title'>{title}</div>
      <div className='codification-codes-values-block__values-list'>
        <FieldArray
          title={title}
          name={form}
          component={BlockByType}
        />
      </div>
      <div className='codification-codes-values-column__footer'>
        <button type='button' className='btn btn-white' onClick={reset} disabled={pristine}>Discard</button>
        <button type='submit' className='btn btn-purple'>Save</button>
      </div>
    </form>
  )
}

export default reduxForm()(FieldForm)
