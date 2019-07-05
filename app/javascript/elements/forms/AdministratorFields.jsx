import React from 'react'
import InputField from '../InputField'

const AdministratorFields = ({ submitErrors, admin }) => {
  return (
    <React.Fragment>
      <div className='row'>
        <div className='form-group col-3'>
          <InputField
            type='text'
            name={`${admin}.username`}
            id='username'
            errorField={submitErrors}
            placeholder='Username'
          />
        </div>
        <div className='form-group col-9'>
          <InputField
            type='text'
            name={`${admin}.last_name`}
            id='last_name'
            errorField={submitErrors}
            placeholder='Last name'
          />
        </div>
      </div>
      <div className='custom_row'>
        <div className='form-group'>
          <InputField
            type='text'
            name={`${admin}.first_name`}
            id='first_name'
            errorField={submitErrors}
            placeholder='First name'
          />
        </div>
      </div>
      <div className='custom_row'>
        <div className='form-group'>
          <InputField
            type='text'
            name={`${admin}.email`}
            id='email'
            errorField={submitErrors}
            placeholder='Email address'
          />
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-3'>
          <InputField
            type='text'
            name={`${admin}.phone_code`}
            id='phone_code'
            errorField={submitErrors}
            placeholder='+00'
          />
        </div>
        <div className='form-group col-9'>
          <InputField
            type='text'
            name={`${admin}.phone_number`}
            id='phone_number'
            errorField={submitErrors}
            placeholder='Phone number'
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdministratorFields
