import React from 'react'
import {
  reduxForm,
  FieldArray,
  formValueSelector,
  Field
} from 'redux-form'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import InputField from '../../../../../elements/InputField'

const originating_company = [
  {
    id: 1,
    value: 'QWE',
    title: 'Originating company'
  },
  {
    id: 2,
    value: 'ABC',
    title: 'Some text'
  },
]
const selector = formValueSelector('codification_section_form')

const BlockByType = ({ fields, changeForm, title }) => {
  const new_value = useSelector(state => selector(state, 'new_value'))
  console.log(new_value)

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
        
        <div className='codification-input-group'>
          <Field
            className='codification-input'
            component={InputField}
            name='new_value.value'
            placeholder='XXX'
          />
          <Field
            className='codification-input'
            component={InputField}
            name='new_value.title'
            placeholder={`${title} title`}
          />
        </div>
      </div>
      <button
        type='button'
        className='with-icon add-button justify-content-center'
        onClick={() => {
          fields.push({ ...new_value })
          changeForm('new_value', {})
        }}>
        <span className='icon-add_1 mr-2' />
        <span data-title='Add Originating company'>Add Originating company</span>
      </button>
    </React.Fragment>
  )
}

function FieldForm({ title, type, handleSubmit, change }) {
  return (
    <form onSubmit={handleSubmit} className={classnames('codification-codes-values-block', type)}>
      <div className='codification-codes-values-block__title'>
        {title}
      </div>
      <div className='codification-codes-values-block__values-list'>
        <FieldArray
          changeForm={change}
          title={title}
          name='originating_company'
          component={BlockByType}
        />
      </div>
    </form>
  )
}

export default reduxForm( {
  form: 'codification_section_form',
  initialValues: { originating_company }
})(FieldForm)
