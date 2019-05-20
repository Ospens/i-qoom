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
import Left from '../../images/arrow-button-left'
import SelectField from '../SelectField'
import countryList from '../../components/landing/countriesCodes'

class BillingAddressForm extends Component {

  handleSubmit = (values) => {
    const { customSubmit } = this.props
    if (customSubmit) {
      customSubmit(values)
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
    const { submitErrors, mainClassName, titleModal, customButtons, country } = this.props

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className={mainClassName}>
            <h6>{titleModal}</h6>
            <div className='form-group'>
              <InputField
                type='text'
                name='billing_company_name'
                id='billing_company_name'
                errorField={submitErrors}
                placeholder='Company name'
              />
            </div>
            <div className='row'>
              <div className='form-group col-8'>
                <InputField
                  type='text'
                  name='billing_registration_number'
                  id='billing_registration_number'
                  errorField={submitErrors}
                  placeholder='Registration number'
                />
              </div>
              <div className='form-group col col-4'>
                <InputField
                  type='text'
                  name='billing_vat_id'
                  id='billing_vat_id'
                  errorField={submitErrors}
                  placeholder='VAT-ID'
                />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-8'>
                <InputField
                  type='text'
                  name='billing_street'
                  id='billing_street'
                  errorField={submitErrors}
                  placeholder='Street name'
                />
              </div>
              <div className='form-group col-4'>
                <InputField
                  type='text'
                  name='billing_house_number'
                  id='billing_house_number'
                  errorField={submitErrors}
                  placeholder='No.'
                />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-8'>
                <InputField
                  type='text'
                  name='billing_city'
                  id='billing_city'
                  errorField={submitErrors}
                  placeholder='City'
                />
              </div>
              <div className='form-group col-4'>
                <InputField
                  type='text'
                  name='billing_postcode'
                  id='billing_postcode'
                  errorField={submitErrors}
                  placeholder='Postcode'
                />
              </div>
            </div>
            <div className='form-group'>
              <Field
                name='billing_country'
                id='billing_country'
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
                  name='billing_district'
                  id='billing_district'
                  errorField={submitErrors}
                  placeholder='District'
                />
              </div>
              <div className='form-group col-6'>
                <InputField
                  type='text'
                  name='billing_district_court'
                  id='billing_district_court'
                  errorField={submitErrors}
                  placeholder='District court'
                />
              </div>
            </div>
          </div>
          {customButtons ? customButtons(this.props) : this.renderSubmitButtons()}
        </form>
      </div>
    )
  }
}
const selector = formValueSelector('billing_address')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('billing_address')(state),
  companyName: selector(state, 'billing_company_name'),
  country: selector(state, 'billing_country'),
})

export default connect(
  mapStateToProps
)(reduxForm({
  form: 'billing_address',
  destroyOnUnmount: false,
  enableReinitialize: true
  })(BillingAddressForm)
)
