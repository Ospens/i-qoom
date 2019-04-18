import React, { Component } from 'react'
import BillingAddressForm from '../../../elements/forms/BillingAddressForm'

class ModalBillingAddress extends Component {

  handleSubmit = () => {
    const { changeStep } = this.props
    changeStep(1)
  }

  render() {
    return (
      <div>
        <BillingAddressForm
          {...this.props}
          mainClassName='modal-body company-data'
          customSubmit={(values) => this.handleSubmit(values)}
          titleModal='Please enter the billing address'
          customSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default ModalBillingAddress