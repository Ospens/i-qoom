import React from 'react'
import { FormSection } from 'redux-form'
import AddressFields from '../../../elements/forms/AddressFields'

const renderSubmitButtons = ({ closeModal, backStep }) => {
  return (
    <div className='new-modal__footer'>
      <button type='button' className='btn btn-back' onClick={() => backStep('company_data.billing_address')}>
        <i className='svg-icon arrow-left-icon' />
        Back
      </button>
      <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
      <button type='submit' className='btn btn-purple'>Next</button>
    </div>
  )
}

function BillingAddress({ submitButtons, ...props }) {
  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title'>Please enter the billing address</h6>
        <FormSection name='billing_address'>
          <AddressFields />
        </FormSection>
      </div>
      {submitButtons ? submitButtons() : renderSubmitButtons(props)}
    </React.Fragment>
  )
}

export default BillingAddress
