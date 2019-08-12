import React from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'
import { required } from '../../elements/validations'

const AddressFields = ({ submitErrors }) => (
  <div>
    <Field
      component={InputField}
      name='company_name'
      id='company_name'
      errorField={submitErrors}
      className='form-group'
      placeholder='Company name'
      validate={[required]}
    />
    <div className='form-row'>
      <Field
        component={InputField}
        name='street'
        id='street'
        errorField={submitErrors}
        className='form-group col-md-8'
        placeholder='Street name'
        validate={[required]}
      />
      <Field
        component={InputField}
        name='house_number'
        id='house_number'
        errorField={submitErrors}
        className='form-group col-md-4'
        placeholder='No.'
        validate={[required]}
      />
    </div>
    <div className='form-row'>
      <Field
        component={InputField}
        name='city'
        id='city'
        errorField={submitErrors}
        className='form-group col-md-8'
        placeholder='City'
        validate={[required]}
      />
      <Field
        component={InputField}
        name='postcode'
        id='postcode'
        errorField={submitErrors}
        className='form-group col-md-4'
        placeholder='Postcode'
      />
    </div>
    <Field
      name='country'
      id='country'
      options={countryList}
      errorField={submitErrors}
      className='form-group'
      component={SelectField}
      validate={[required]}
    />
    <div className='form-row'>
      <Field
        component={InputField}
        name='district'
        id='district'
        errorField={submitErrors}
        className='form-group col-md-6'
        placeholder='District'
      />
      <Field
        component={InputField}
        name='district_court'
        id='district_court'
        errorField={submitErrors}
        className='form-group col-md-6'
        placeholder='District court'
      />
    </div>
  </div>
)

export default AddressFields
