import React from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

const AddressFields = ({ submitErrors }) => (
  <React.Fragment>
    <div className='form-group'>
      <Field
        component={InputField}
        name='company_name'
        id='company_name'
        errorField={submitErrors}
        placeholder='Company name'
      />
    </div>
    <div className='row'>
      <div className='form-group col-8'>
        <Field
          component={InputField}
          name='street'
          id='street'
          errorField={submitErrors}
          placeholder='Street name'
        />
      </div>
      <div className='form-group col-4'>
        <Field
          component={InputField}
          name='house_number'
          id='house_number'
          errorField={submitErrors}
          placeholder='No.'
        />
      </div>
    </div>
    <div className='row'>
      <div className='form-group col-8'>
        <Field
          component={InputField}
          name='city'
          id='city'
          errorField={submitErrors}
          placeholder='City'
        />
      </div>
      <div className='form-group col-4'>
        <Field
          component={InputField}
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
        <Field
          component={InputField}
          name='district'
          id='district'
          errorField={submitErrors}
          placeholder='District'
        />
      </div>
      <div className='form-group col-6'>
        <Field
          component={InputField}
          name='district_court'
          id='district_court'
          errorField={submitErrors}
          placeholder='District court'
        />
      </div>
    </div>
  </React.Fragment>
)

export default AddressFields
