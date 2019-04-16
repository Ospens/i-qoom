import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector
} from 'redux-form'
import InputField from '../../../elements/InputField'
import Left from '../../../images/arrow-button-left'
import { startCreateProject } from '../../../actions/projectActions'

class ModalBillingAddress extends Component {

  handleSubmit = () => {
    const { changeStep } = this.props
    changeStep(1)
  }

  render() {
    const { submitErrors, closeModal, changeStep, companyName } = this.props
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className='modal-body company-data'>
            <h6>Please enter the billing address</h6>
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
                  name='registration_number'
                  id='registration_number'
                  errorField={submitErrors}
                  placeholder='Registration number'
                />
              </div>
              <div className='form-group col col-4'>
                <InputField
                  type='text'
                  name='vat_id'
                  id='vat_id'
                  errorField={submitErrors}
                  placeholder='VAT-ID'
                />
              </div>
            </div>
            <div className='row'>
              <div className='form-group col-8'>
                <InputField
                  type='text'
                  name='street_name'
                  id='street_name'
                  errorField={submitErrors}
                  placeholder='Street name'
                />
              </div>
              <div className='form-group col-4'>
                <InputField
                  type='text'
                  name='street_number'
                  id='street_number'
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
              <InputField
                type='text'
                name='country'
                id='country'
                errorField={submitErrors}
                placeholder='Country'
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
          </div>
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
        </form>
      </div>
    )
  }
}
const selector = formValueSelector('billing_address')

const mapDispatchToProps = dispatch => ({
  startCreateProject: (name) => dispatch(startCreateProject(name))
})

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('billing_address')(state),
  companyName: selector(state, 'company_name')
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'billing_address',
  destroyOnUnmount: false
})(ModalBillingAddress)
)
