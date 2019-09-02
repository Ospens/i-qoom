import React from 'react'
import { Field, FormSection } from 'redux-form'
import InputField from '../InputField'
import FileField from '../FileField'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'
import { required } from '../../elements/validations' 

const CompanyFields = () => (
  <div>
    <div className='row'>
      <div className='col-logo'>
        <div className='form-group'>
          <div className='logo-uploader'>
            <Field
              type='file'
              name='logo'
              id='file_logo'
              component={FileField}
              dataAllowedFileExtensions='jpg png bmp'
            />
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='row'>
          <div className='form-group col-12'>
            <FormSection name='company_address'>
              <Field
                component={InputField}
                name='company_name'
                id='company_name'
                placeholder='Company name'
                validate={[required]}
              />
            </FormSection>
          </div>
        </div>
        <div className='row'>
          <Field
            component={InputField}
            name='registration_number'
            id='registration_number'
            placeholder='Registration number'
            className='form-group col col-65per'
          />
          <Field
            component={InputField}
            name='vat_id'
            id='vat_id'
            placeholder='VAT-ID'
            validate={[required]}
            className='form-group col'
          />
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
            placeholder='Street name'
            validate={[required]}
          />
        </div>
        <div className='form-group col-4'>
          <Field
            component={InputField}
            name='house_number'
            id='house_number'
            placeholder='No.'
            validate={[required]}
          />
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-8'>
          <Field
            component={InputField}
            name='city'
            id='city'
            placeholder='City'
            validate={[required]}
          />
        </div>
        <div className='form-group col-4'>
          <Field
            component={InputField}
            name='postcode'
            id='postcode'
            placeholder='Postcode'
            validate={[required]}
          />
        </div>
      </div>
      <div className='form-group'>
        <Field
          name='country'
          id='country'
          options={countryList}
          component={SelectField}
          validate={[required]}
        />
      </div>
      <div className='row'>
        <div className='form-group col-6'>
          <Field
            component={InputField}
            name='district'
            id='district'
            placeholder='District'
          />
        </div>
        <div className='form-group col-6'>
          <Field
            component={InputField}
            name='district_court'
            id='district_court'
            placeholder='District court'
          />
        </div>
      </div>
    </ FormSection>
  </div>
)

export default CompanyFields
