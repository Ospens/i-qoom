import React from 'react'
import CompanyFields from '../../../elements/forms/CompanyFields'
import CheckboxField from '../../../elements/CheckboxField'

function companyData(closeModal, backStep) {
  return (
    <React.Fragment>
      <div className="new-modal__body">
        <h6 className="new-modal__body-title">
          Please enter company data
        </h6>
        <CompanyFields />
        <div className="form-group text-left rect-checkbox">
          <CheckboxField
            name="same_for_billing_address"
            checkBoxId="billing_address"
            labelClass="form-check-label mr-2"
            text="This is also the billing address"
          />
        </div>
      </div>
      <div className="new-modal__footer">
        <button type="button" className="btn btn-back" onClick={() => backStep('company_data')}>
          <span className="icon-arrow-button-left" />
          Back
        </button>
        <button type="button" className="btn btn-white" onClick={closeModal}>Cancel</button>
        <button type="submit" className="btn btn-purple">Next</button>
      </div>
    </React.Fragment>
  )
}

export default companyData
