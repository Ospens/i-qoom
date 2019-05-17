import React, { Component } from 'react'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalComponent from '../../../elements/ModalComponent'

class ModalFirstAdmin extends Component {

  render() {
    const { modalTitle, form } = this.props 
    return (
      <ModalComponent>
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
      </ModalComponent>
    )
  }
}

export default ModalFirstAdmin
