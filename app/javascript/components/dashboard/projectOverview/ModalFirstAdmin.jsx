import React, { Component } from 'react'
import CreateAdministratorForm from './forms/CreateAdministratorForm'

class ModalFirstAdmin extends Component {

  render() {
    return (
      <CreateAdministratorForm
        {...this.props}
        titleModal='Who is the project administrator?'
        label='Project administrator'
        nameForm='create_administrator'
      />
    )
  }
}

export default ModalFirstAdmin
