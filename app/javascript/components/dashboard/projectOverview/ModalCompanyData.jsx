import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import ModalComponent from '../../../elements/ModalComponent'

class ModalCompanyData extends Component {

  handleSubmit = (values) => {
    const { changeStep } = this.props
    const step = values.billing_address ? 2 : 1
    changeStep(step)
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
