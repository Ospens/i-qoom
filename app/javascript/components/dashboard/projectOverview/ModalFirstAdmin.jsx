import React, { Component } from 'react'
import AdministratorForm from '../../../elements/forms/AdministratorForm'

class ModalFirstAdmin extends Component {

  render() {
    const { modalTitle, form } = this.props 
    return (
      <div className='new-project-modal'>
        <h4>{modalTitle || 'New project'}</h4>
        <AdministratorForm
          {...this.props}
          titleModal='Who is the project administrator?'
          label='Project administrator'
          form={form ||'administrator_form'}
          mainClass='modal-body'
        />
      </div>
    )
  }
}

export default ModalFirstAdmin
