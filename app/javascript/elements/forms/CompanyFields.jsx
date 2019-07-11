import React from 'react'
import { Field, FormSection } from 'redux-form'
import InputField from '../InputField'
import FileField from '../FileField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

const CompanyFields = ({ submitErrors }) => (
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
            <FormSection name='company_address'>
              <Field
                component={InputField}
                name='company_name'
                id='company_name'
                errorField={submitErrors}
                placeholder='Company name'
              />
            </FormSection>
          </div>
        </div>
        <div className='row'>
          <div className='form-group col col-55per'>
            <Field
              component={InputField}
              name='registration_number'
              id='registration_number'
              errorField={submitErrors}
              placeholder='Registration number'
            />
          </div>
          <div className='form-group col col-45per'>
            <Field
              component={InputField}
              name='vat_id'
              id='vat_id'
              errorField={submitErrors}
              placeholder='VAT-ID'
            />
          </div>
        </div>
      </div>
    </div>
    <FormSection name='company_address'>
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
    </ FormSection>
  </React.Fragment>
)

export default CompanyFields
