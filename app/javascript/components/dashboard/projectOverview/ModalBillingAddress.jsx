import React, { Component } from 'react'
import BillingAddressForm from '../../../elements/forms/BillingAddressForm'

class ModalBillingAddress extends Component {

  render() {
    const { modalTitle } = this.props 
    return (
      <div className='new-project-modal'>
        <h4>{modalTitle || 'New project'}</h4>
        <BillingAddressForm
          {...this.props}
          mainClassName='modal-body company-data'
          titleModal='Please enter the billing address'
        />
      </div>
    )
  }
}

export default ModalBillingAddress