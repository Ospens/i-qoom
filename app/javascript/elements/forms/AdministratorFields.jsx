import React from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import { email, required } from '../../elements/validations'

const AdministratorFields = ({ submitErrors, admin, disabled = false }) => {
  const prefix = admin ? `${admin}.` : ''

  return (
    <div>
      <div className='form-row'>
        <Field
          component={InputField}
          name={`${prefix}username`}
          errorField={submitErrors}
          placeholder='Username'
          validate={[required]}
          className='form-group col-3'
          disabled={disabled}
        />
        <Field
          component={InputField}
          name={`${prefix}last_name`}
          errorField={submitErrors}
          placeholder='Last name'
          validate={[required]}
          className='form-group col-9'
          disabled={disabled}
        />
      </div>
      <Field
        component={InputField}
        name={`${prefix}first_name`}
        errorField={submitErrors}
        placeholder='First name'
        validate={[required]}
        className='form-group'
        disabled={disabled}
      />
      <Field
        component={InputField}
        name={`${prefix}email`}
        errorField={submitErrors}
        placeholder='Email address'
        validate={[email, required]}
        className='form-group'
        disabled={disabled}
      />
      {!disabled &&
      <div className='form-row'>
        <Field
          component={InputField}
          name={`${prefix}phone_code`}
          errorField={submitErrors}
          placeholder='+00'
          className='form-group col-3'
        />
        <Field
          component={InputField}
          name={`${prefix}phone_number`}
          errorField={submitErrors}
          placeholder='Phone number'
          className='form-group col-9'
        />
      </div>}
    </div>
  )
}

export default AdministratorFields
