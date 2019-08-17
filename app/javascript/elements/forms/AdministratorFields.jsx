import React from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import { email, required } from '../../elements/validations'

const AdministratorFields = ({ submitErrors, admin }) => {
  const prefix = admin ? `${admin}.` : ''

  return (
    <div>
      <div className='form-row'>
        <div className='form-group col-3'>
          <Field
            type='text'
            component={InputField}
            name={`${prefix}username`}
            errorField={submitErrors}
            placeholder='Username'
            validate={[required]}
          />
        </div>
        <div className='form-group col-9'>
          <Field
            type='text'
            component={InputField}
            name={`${prefix}last_name`}
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
          name={`${prefix}first_name`}
          errorField={submitErrors}
          placeholder='First name'
          validate={[required]}
        />
      </div>
      <div className='form-group'>
        <Field
          component={InputField}
          name={`${prefix}email`}
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
            name={`${prefix}phone_code`}
            errorField={submitErrors}
            placeholder='+00'
          />
        </div>
        <div className='form-group col-9'>
          <Field
            type='text'
            component={InputField}
            name={`${prefix}phone_number`}
            errorField={submitErrors}
            placeholder='Phone number'
          />
        </div>
      </div>
    </div>
  )
}

export default AdministratorFields
