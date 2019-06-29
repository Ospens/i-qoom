import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import {
  getFormSubmitErrors,
  reduxForm,
  Field,
  formValueSelector
} from 'redux-form'
import InputField from '../InputField'
import FileField from '../FileField'
import CheckboxField from '../CheckboxField'
import Left from '../../images/arrow-button-left'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

class CompanyForm extends Component {

  handleSubmit = (values) => {
    const { customSubmit } = this.props
    if (customSubmit) {
      return customSubmit(values)
    }
  }

  renderSubmitButtons = () => {
    const { closeModal, changeStep, companyName } = this.props
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <ReactSVG
            svgStyle={{ height: 10, width: 10, marginRight: 5 }}
            src={Left}
          />
          Back
            </button>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple' disabled={!companyName}>Next</button>
      </div>
    )
  }

  render() {
    const { submitErrors, mainClassName, customButtons, headerForm, creating, pristine, country } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className={mainClassName}>
            <h6>{headerForm}</h6>
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
                value={country}
                newValue={country}
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
            {creating &&
              <div className='form-group text-left rect-checkbox'>
              <CheckboxField
                name='same_for_billing_address'
                checkBoxId='billing_address'
                labelClass='form-check-label mr-2'
                text='This is also the billing address'
                errorField={submitErrors}
              />
            </div>}
          </div>
          {customButtons ? customButtons(pristine) : this.renderSubmitButtons()}
        </form>
      </div>
    )
  }
}

const selector = formValueSelector('company_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('company_form')(state),
  companyName: selector(state, 'company_name'),
  country: selector(state, 'country'),
})

export default connect(
  mapStateToProps
  )(reduxForm(
    {
      form: 'company_form',
      // destroyOnUnmount: false,
      enableReinitialize: true
    })
  (CompanyForm))
