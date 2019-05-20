import React, { Component } from 'react'
import ModalComponent from '../../../../elements/ModalComponent'
import MemberDetailsForm from '../../../../elements/forms/MemberDetailsForm'

class ModalMemberDetails extends Component {
  state = {}

  handleSubmit = (values) => {
    const { changeStep } = this.props
    changeStep(1)
  }

  render() {
    return (
      <ModalComponent>
        <div className='new-project-modal'>
          <h4>Add member</h4>
          <MemberDetailsForm
            {...this.props}
            mainClassName='modal-body member-details'
            customSubmit={(values) => this.handleSubmit(values)}
            headerForm='Please enter member details'
            creNew projectating={true}
          />
        </div>
      </ModalComponent>
    )
  }
}

export default ModalMemberDetails
