import React, { Component } from 'react'
import ModalTypeEmployment from './ModalTypeEmployment'
import ModalCompanyEmplyee from './ModalCompanyEmplyee'
import ModalMemberDetails from './ModalMemberDetails'

class AddMember extends Component {
  state = { 
    step: 1
   }

  changeStep = (val) => {
    this.setState({ step: val })
  }

  closeModal = () => {
    const { closeModal } = this.props
    this.changeStep(1)
    closeModal()
  }

  render() { 
    const { step } = this.state
    return (
      <div>
        {step === 1 && <ModalTypeEmployment closeModal={this.closeModal} changeStep={(val) => this.changeStep(val)} />}
        {step === 2 && <ModalCompanyEmplyee closeModal={this.closeModal} changeStep={(val) => this.changeStep(val)} />}
        {step === 3 && <ModalMemberDetails closeModal={this.closeModal} changeStep={(val) => this.changeStep(val)} />}
      </div>
    )
  }
}
 
export default AddMember