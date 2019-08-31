import React, { Component } from 'react'
import CompanyFields from '../../../elements/forms/CompanyFields'
import CheckboxField from '../../../elements/CheckboxField'

class CompanyData extends Component {

  renderSubmitButtons = () => {
    const { closeModal, changeStep } = this.props
    
    return (
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <i className='svg-icon arrow-left-icon' />
          Back
        </button>
        <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className='new-modal__body'>
          <h6 className='new-modal__body-title'>
            Please enter company data
          </h6>
          <CompanyFields/>
          <div className='form-group text-left rect-checkbox'>
            <CheckboxField
              name='same_for_billing_address'
              checkBoxId='billing_address'
              labelClass='form-check-label mr-2'
              text='This is also the billing address'
            />
          </div>
        </div>
        {this.renderSubmitButtons()}
      </React.Fragment>
    )
  }
}

export default CompanyData
