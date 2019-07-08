import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector, getFormSubmitErrors } from 'redux-form'
import ReactSVG from 'react-svg'
import Left from '../../../images/arrow-button-left'
import BillingAddressFields from '../../../elements/forms/BillingAddressFields'

class ModalBillingAddress extends Component {

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
    const { submitErrors, submitButtons, modalTitle } = this.props

    return (
      <div className='new-project-modal'>
        <h4>{modalTitle ? modalTitle : 'New project'}</h4>
        <div className='modal-body company-data'>
          <h6>Please enter the billing address</h6>
          <BillingAddressFields submitErrors={submitErrors} />
        </div>
        {submitButtons ? submitButtons() : this.renderSubmitButtons()}
      </div>
    )
  }
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  companyName: selector(state, 'company_data_attributes.billing_address_attributes.company_name')
})

export default connect(mapStateToProps)(ModalBillingAddress)
