import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector, getFormSubmitErrors, FormSection } from 'redux-form'
import AddressFields from '../../../elements/forms/AddressFields'

class BillingAddress extends Component {

  renderSubmitButtons = () => {
    const { closeModal, changeStep, companyName } = this.props
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <i className='svg-icon arrow-left-icon' />
          Back
        </button>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple' disabled={!companyName}>Next</button>
      </div>
    )
  }

  render() {
    const { submitErrors, submitButtons, modalTitle } = this.props

    return (
      <div className='new-project-modal'>
        <h4>{modalTitle ? modalTitle : 'New project'}</h4>
        <div className='modal-body company-data'>
          <div>
            <h6>Please enter the billing address</h6>
            <FormSection name='billing_address'>
              <AddressFields submitErrors={submitErrors} />
            </FormSection>
          </div>
        </div>
        {submitButtons ? submitButtons() : this.renderSubmitButtons()}
      </div>
    )
  }
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  companyName: selector(state, 'company_data.billing_address.company_name')
})

export default connect(mapStateToProps)(BillingAddress)
