import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import ModalComponent from '../../../elements/ModalComponent'

class ModalCompanyData extends Component {

  handleSubmit = (values) => {
    const { changeStep, customSubmit } = this.props
    const step = values.same_for_billing_address ? 2 : 1
    console.log(step)
    if (step === 2) {
      customSubmit()
    } else {
      changeStep(step)
    }
  }

  render() {
    const { modalTitle } = this.props 
    return (
      <ModalComponent>
        <div className='new-project-modal'>
          <h4>{modalTitle || 'New project'}</h4>
          <CompanyForm
            {...this.props}
            mainClassName='modal-body company-data'
            customSubmit={(values) => this.handleSubmit(values)}
            customButtons={this.renderSubmitButtons}
            headerForm='Please enter company data'
            creating={true}
          />
        </div>
      </ModalComponent>
    )
  }
}

export default ModalCompanyData
