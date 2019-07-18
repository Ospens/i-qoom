import React from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import { email, required } from '../../elements/validations'

const AdministratorFields = ({ submitErrors, admin }) => {
  return (
    <div className='admin-form'>
      <div className='form-row'>
        <div className='form-group col-3'>
          <Field
            type='text'
            component={InputField}
            name={`${admin}.username`}
            id='username'
            errorField={submitErrors}
            placeholder='Username'
            validate={[required]}
          />
        </div>
        <div className='form-group col-9'>
          <Field
            type='text'
            component={InputField}
            name={`${admin}.last_name`}
            id='last_name'
            errorField={submitErrors}
            placeholder='Last name'
            validate={[required]}
          />
        </div>
      </div>
      <div className='form-group'>
        <Field
          type='text'
          component={InputField}
          name={`${admin}.first_name`}
          id='first_name'
          errorField={submitErrors}
          placeholder='First name'
          validate={[required]}
        />
      </div>
      <div className='form-group'>
        <Field
          component={InputField}
          name={`${admin}.email`}
          id='email'
          errorField={submitErrors}
          placeholder='Email address'
          validate={[email, required]}
        />
      </div>
      <div className='form-row'>
        <div className='form-group col-3'>
          <Field
            type='text'
            component={InputField}
            name={`${admin}.phone_code`}
            id='phone_code'
            errorField={submitErrors}
            placeholder='+00'
          />
        </div>
        <div className='form-group col-9'>
          <Field
            type='text'
            component={InputField}
            name={`${admin}.phone_number`}
            id='phone_number'
            errorField={submitErrors}
            placeholder='Phone number'
          />
        </div>
      </div>
    </div>
  )
}

export default AdministratorFields
