import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector, getFormSubmitErrors } from 'redux-form'
import ReactSVG from 'react-svg'
import Left from '../../../images/arrow-button-left'
import CompanyFields from '../../../elements/forms/CompanyFields'
import CheckboxField from '../../../elements/CheckboxField'

class ModalCompanyData extends Component {

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
        <button
          type='submit'
          className='btn btn-purple'
          disabled={!companyName}
        >
          Next
        </button>
      </div>
    )
  }

  render() {
    const { submitErrors } = this.props

    return (
      <div className='new-project-modal'>
        <h4>New project</h4>

        <div className='modal-body company-data'>
          <h6>Please enter company data</h6>
          <CompanyFields submitErrors={submitErrors}/>
          <div className='form-group text-left rect-checkbox'>
            <CheckboxField
              name='same_for_billing_address'
              checkBoxId='billing_address'
              labelClass='form-check-label mr-2'
              text='This is also the billing address'
              errorField={submitErrors}
            />
          </div>
        </div>
        {this.renderSubmitButtons()}
      </div>
    )
  }
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  companyName: selector(state, 'company_data_attributes.company_address_attributes.company_name')
})

export default connect(mapStateToProps)(ModalCompanyData)
