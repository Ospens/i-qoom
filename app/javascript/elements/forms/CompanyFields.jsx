import React, { Component } from 'react'
import { Field } from 'redux-form'
import InputField from '../InputField'
import FileField from '../FileField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

const CompanyFields = ({ submitErrors }) => {
  return (
    <React.Fragment>
      <div className='row'>
        <div className='col-3'>
          <div className='form-group'>
            <div className='logo-uploader'>
              <Field
                type='file'
                name='logo'
                id='file_logo'
                label='Add a logo'
                component={FileField}
                dataAllowedFileExtensions='jpg png bmp'
              />
            </div>
          </div>
        </div>
        <div className='col-9'>
          <div className='row'>
            <div className='form-group col-12'>
              <InputField
                type='text'
                name='company_name'
                id='company_datum.company_address.company_name'
                errorField={submitErrors}
                placeholder='Company name'
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col col-55per'>
              <InputField
                type='text'
                name='registration_number'
                id='company_datum.registration_number'
                errorField={submitErrors}
                placeholder='Registration number'
              />
            </div>
            <div className='form-group col col-45per'>
              <InputField
                type='text'
                name='vat_id'
                id='company_datum.vat_id'
                errorField={submitErrors}
                placeholder='VAT-ID'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-8'>
          <InputField
            type='text'
            name='street'
            id='company_datum.company_address.street'
            errorField={submitErrors}
            placeholder='Street name'
          />
        </div>
        <div className='form-group col-4'>
          <InputField
            type='text'
            name='house_number'
            id='company_datum.company_address.house_number'
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
            id='company_datum.company_address.city'
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
          id='company_datum.company_address.country'
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
    </React.Fragment>
  )
}

export default CompanyFields
