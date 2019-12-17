import React from 'react'
import CompanyFields from '../../../elements/forms/CompanyFields'
import { Field } from 'redux-form'
import CheckBoxField from '../../../elements/CheckBoxField'

function companyData(closeModal, backStep) {
  return (
    <React.Fragment>
      <div className="new-modal__body">
        <h6 className="new-modal__body-title">
          Please enter company data
        </h6>
        <CompanyFields />
        <div className="form-group">
          <Field
            component={CheckBoxField}
            id="same_for_billing_address"
            name="same_for_billing_address"
            labelClass="mr-2"
            text="This is also the billing address"
            className="d-flex justify-content-center"
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
