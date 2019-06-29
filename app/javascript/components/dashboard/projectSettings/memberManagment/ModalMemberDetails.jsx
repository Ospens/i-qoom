import React, { Component } from 'react'
import MemberDetailsForm from '../../../../elements/forms/MemberDetailsForm'

class ModalMemberDetails extends Component {
  state = {}

  handleSubmit = (values) => {
    const { changeStep } = this.props
    changeStep(1)
  }

  render() {
    return (
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
    )
  }
}

export default ModalMemberDetails
