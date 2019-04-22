import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import ReactSVG from 'react-svg'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalBillingAddress from '../projectOverview/ModalBillingAddress'
import ModalFirstAdmin from '../projectOverview/ModalFirstAdmin'
import { Dropdown, Ref } from 'semantic-ui-react'
import dots from '../../../images/dots-horizontal'
import trashBucket from '../../../images/trash_bucket'
import pencil from '../../../images/pencil-write'
import searchIcon from '../../../images/search-alternate'
import emailSend from '../../../images/email-action-send-2'
import ModalComponent from '../../../elements/ModalComponent'


class ProjectDetails extends Component {

  state = {
    billingForm: false,
    adminForm: false,
    adminErrorModal: false,
    adminInspectModal: false,
    confirm: false
  }

  toggleModals = (key, val) => {
    this.setState({ [key]: val })
  }

  modalButtons = props => {
    return (
      <div className='modal-footer'>
        <button type='button' className='btn btn-white-blue clear-form' onClick={props.reset}>
          Clear form
        </button>
        <button
          type='button'
          className='btn btn-white'
          onClick={() => this.toggleModals('billingForm', false)}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple'>Save</button>
      </div>
    )
  }

  modalButtonsAdmin = () => {
    return (
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={() => this.toggleModals('adminForm', false)}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple'>Invite</button>
      </div>
    )
  }

  renderCompanyDataButtons = pristine => {
    return (
      <div>
        {!pristine &&
          <button type='button' className='btn btn-purple wide-button mb-2' >
            Save changes
          </button>}
        <button
          type='submit'
          className='btn btn-white-blue wide-button'
          onClick={() => this.toggleModals('billingForm', true)}
        >
          Billing address
        </button>
      </div>
    )
  }

  renderNewSecondAdminColumn = () => {
    return (
      <React.Fragment>
        <div className='block-title'>
          <span>Project administrator 2</span>
        </div>
        <button
          type='button'
          className='btn btn-purple wide-button second-admin'
          onClick={() => this.toggleModals('adminForm', true)}
        >
          Add project administrator
        </button>
      </React.Fragment>
    )
  }

  renderFormSecondAdminColumn = () => {
    const { confirm } = this.state
    const options = [
      {
        key: 'resend_email',
        text: this.renderItem(emailSend, 'Resend email')
      },
      {
        key: 'check_status',
        text: this.renderItem(searchIcon, 'Check status'),
        onClick: () => this.toggleModals('adminInspectModal', true)
      },
      {
        key: 'delete',
        text: this.renderItem(trashBucket, 'Delete'),
        onClick: () => this.toggleModals('adminInspectModal', true)
      }
    ]
    const confirmMsg = (
      <div className='msg-card'>
        Do you really want to resend this invitation?
        <button className='btn btn-white-grey'>
          Cancel
        </button>
        <button className='btn btn-white-red'>
          Resend
        </button>
      </div>
    )

    const confirmMsgDel = (
      <div className='msg-card'>
        Do you really want to delete the administrator?
        <button className='btn btn-white-grey'>
          Cancel
        </button>
        <button className='btn btn-white-red'>
          Delete
        </button>
      </div>
    )
    return (
      <React.Fragment>
        <div className='block-title'>
          <span>Project administrator 2</span>
          <span className='wait-confirm-admin'>Awaiting confirmation</span>
          <Dropdown trigger={this.trigger()} pointing='top right' icon={null}>
            <Dropdown.Menu>
              <Dropdown.Item >
                <Dropdown trigger={this.renderItem(emailSend, 'Resend email')} pointing='right' icon={null}>
                  <Dropdown.Menu className='confirm-msg'>
                    <Dropdown.Item>{confirmMsg}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Item>
              <Dropdown.Item {...options[1]}/>
              <Dropdown.Item >
                <Dropdown trigger={this.renderItem(trashBucket, 'Delete')} pointing='right' icon={null}>
                  <Dropdown.Menu className='confirm-msg'>
                    <Dropdown.Item>{confirmMsgDel}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <AdministratorForm
          {...this.props}
          nameForm='edit_administrator_2'
          customButtons={this.renderAdminButtons}
        />
      </React.Fragment>
    )
  }

  renderAdminButtons = pristine => {
    return (
      <div>
        {!pristine &&
          <button type='button' className='btn btn-purple wide-button mb-2' >
            Save changes
          </button>}
      </div>
    )
  }

  trigger = () => (
    <ReactSVG
      svgStyle={{ height: 15, width: 15 }}
      src={dots}
    />
  )

  openAdminErrorModal = () => (
    <ModalComponent>
      <div className='modal-body terms-modal'>
        <h4>Sorry, you can't do that yet</h4>
        <p>
          Please note that you need two
          <span className='active-admin'>active</span> administrators before you can change your
          information or delete yourself as administrator
        </p>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-purple'
          onClick={() => this.toggleModals('adminErrorModal', false)}
        >
          Done
        </button>
      </div>
    </ModalComponent>
  )

  openAdminInspectModal = () => (
    <ModalComponent>
      <div className='modal-body terms-modal'>
        <h4>Awaiting confirmation</h4>
        <p>
          An email was successfully sent to <a href='#'>email.address@gmail.com</a>
          January 22, 2019, 8.14 pm.
        </p>
        <p>The email was resent January 22, 2019, 9.32 pm.</p>
      </div>
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-purple'
          onClick={() => this.toggleModals('adminInspectModal', false)}
        >
          Done
        </button>
      </div>
    </ModalComponent>
  )

  renderItem = (pic, title, action) => (
    <span onClick={action} className='text'>
      <ReactSVG
        svgStyle={{ height: 15, width: 15 }}
        src={pic}
      />
      <span className='item-text'>
        {title}
      </span>
    </span>
  )

  render() {
    const { billingForm, adminForm, adminErrorModal, adminInspectModal } = this.state
    const options = [
      {
        key: 'user',
        content: this.renderItem(pencil, 'Edit details'),
        onClick: () => this.toggleModals('adminErrorModal', true)
      },
      {
        key: 'settings',
        text: this.renderItem(trashBucket, 'Delete'),
        onClick: () => this.toggleModals('adminInspectModal', true)
      }
    ]

    return (
      <React.Fragment>
        <h5 className='tab-title'>Project details</h5>
        <div className='row'>
          <div className='col-lg-4'>
            <span className='block-title'>Company data</span>
            <CompanyForm
              {...this.props}
              customButtons={this.renderCompanyDataButtons}
            />
          </div>
          <div className='col-lg-4'>
            <div className='block-title'>
              <span>Project administrator 1</span>
              <span className='active-admin'>Active</span>
              <Dropdown trigger={this.trigger()} options={options} pointing='top right' icon={null} />
            </div>
            <AdministratorForm
              {...this.props}
              nameForm='edit_administrator'
              customButtons={this.renderAdminButtons}
            />
          </div>
          <div className='col-lg-4'>
            {this.renderFormSecondAdminColumn()}
          </div>
        </div>
        {adminErrorModal && this.openAdminErrorModal()}
        {adminInspectModal && this.openAdminInspectModal()}
        {billingForm &&
          <ModalBillingAddress
            closeModal={() => this.toggleModals('billingForm', false)}
            customButtons={this.modalButtons}
            modalTitle='Billing address'
            customSubmit={() => this.toggleModals('billingForm', false)}
          />}
        {adminForm &&
          <ModalFirstAdmin
            closeModal={() => this.toggleModals('adminForm', false)}
            customButtons={this.modalButtonsAdmin}
            modalTitle='New project administrator'
            nameForm='create_administrator_2'
            customSubmit={() => this.toggleModals('adminForm', false)}
          />}
      </React.Fragment>
      )
  }
}
 
export default ProjectDetails