import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import ReactSVG from 'react-svg'
import Left from '../../../images/arrow-button-left'
import CompanyFields from '../../../elements/forms/CompanyFields'
import CheckboxField from '../../../elements/CheckboxField'
import { startUpdateProject } from '../../../actions/projectActions'

class ModalCompanyData extends Component {

  handleNext = () => {
    const { changeStep, sameBillingAddress } = this.props

    const step = sameBillingAddress ? 2 : 1
    changeStep(step)
  }

  renderSubmitButtons = () => {
    const { closeModal, changeStep, companyName, sameBillingAddress } = this.props
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
          type={sameBillingAddress ? 'submit' : 'button'}
          className='btn btn-purple'
          disabled={!companyName}
          onClick={this.handleNext}
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
          <CompanyFields />
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

        {/* <CompanyForm
          {...this.props}
          mainClassName='modal-body company-data'
          customSubmit={(values) => this.handleSubmit(values)}
          headerForm='Please enter company data'
          creating={true}
        />*/}
      </div>
    )
  }
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  project: state.projects.project,
  companyName: selector(state, 'company_name'),
  sameBillingAddress: selector(state, 'same_for_billing_address'),
})

const mapDispatchToProps = dispatch => ({
  updateProject: (values, id, step) => dispatch(startUpdateProject(values, id, step))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalCompanyData)
