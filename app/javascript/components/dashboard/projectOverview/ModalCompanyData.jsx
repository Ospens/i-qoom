import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'

class ModalCompanyData extends Component {

  handleSubmit = (values) => {
    const { changeStep } = this.props
    const step = values.billing_address ? 2 : 1
    changeStep(step)
  }

  render() {
    return (
      <div>
        <CompanyForm
          {...this.props}
          mainClassName='modal-body company-data'
          customSubmit={(values) => this.handleSubmit(values)}
          customButtons={this.renderSubmitButtons}
          headerForm='Please enter company data'
          creating={true}
        />
      </div>
    )
  }
}

export default ModalCompanyData
