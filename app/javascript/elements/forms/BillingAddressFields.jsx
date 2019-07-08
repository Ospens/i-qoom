import React from 'react'
import { Field, FormSection } from 'redux-form'
import InputField from '../InputField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

const BillingAddressFields = ({ submitErrors }) => (
  <FormSection name='billing_address'>
    <div className='form-group'>
      <InputField
        type='text'
        name='company_name'
        id='company_name'
        errorField={submitErrors}
        placeholder='Company name'
      />
    </div>
    <div className='row'>
      <div className='form-group col-8'>
        <InputField
          type='text'
          name='street'
          id='street'
          errorField={submitErrors}
          placeholder='Street name'
        />
      </div>
      <div className='form-group col-4'>
        <InputField
          type='text'
          name='house_number'
          id='house_number'
          errorField={submitErrors}
          placeholder='No.'
        />
      </div>
    </div>
    <div className='row'>
      <div className='form-group col-8'>
        <InputField
          type='text'
          name='city'
          id='city'
          errorField={submitErrors}
          placeholder='City'
        />
      </div>
      <div className='form-group col-4'>
        <InputField
          type='text'
          name='postcode'
          id='postcode'
          errorField={submitErrors}
          placeholder='Postcode'
        />
      </div>
    </div>
    <div className='form-group'>
      <Field
        name='country'
        id='country'
        options={countryList}
        errorField={submitErrors}
        component={SelectField}
      />
    </div>
    <div className='row'>
      <div className='form-group col-6'>
        <InputField
          type='text'
          name='district'
          id='district'
          errorField={submitErrors}
          placeholder='District'
        />
      </div>
      <div className='form-group col-6'>
        <InputField
          type='text'
          name='district_court'
          id='district_court'
          errorField={submitErrors}
          placeholder='District court'
        />
      </div>
    </div>
  </FormSection>
)

export default BillingAddressFields
