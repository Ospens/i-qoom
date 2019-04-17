import React, { Component } from 'react'
import AdministratorForm from '../../../elements/forms/AdministratorForm'

class ModalFirstAdmin extends Component {

  render() {
    return (
      <AdministratorForm
        {...this.props}
        titleModal='Who is the project administrator?'
        label='Project administrator'
        nameForm='create_administrator'
        mainClass='modal-body'
      />
    )
  }
}

export default ModalFirstAdmin
