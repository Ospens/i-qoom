import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalBillingAddress from '../projectOverview/ModalBillingAddress'
import ModalFirstAdmin from '../projectOverview/ModalFirstAdmin'
import { Dropdown } from 'semantic-ui-react'
import { startUpdateProject } from '../../../actions/projectActions'
import dots from '../../../images/dots-horizontal'
import trashBucket from '../../../images/trash_bucket'
import pencil from '../../../images/pencil-write'
import searchIcon from '../../../images/search-alternate'
import emailSend from '../../../images/email-action-send-2'
import ModalComponent from '../../../elements/ModalComponent'
import DropDownMenu from '../../../elements/DropDownMenu'


class ProjectDetails extends Component {

  state = {
    billingForm: false,
    adminForm: false,
    adminErrorModal: false,
    adminInspectModal: false,
    adminFirstSaved: false,
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
        <button
          type='submit'
          className='btn btn-purple'
          >
          Invite
        </button>
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
    const options = 
      {
        key: 'check_status',
        text: this.renderItem(searchIcon, 'Check status'),
        onClick: () => this.toggleModals('adminInspectModal', true)
      }

    const { admins } = this.props
    let secondAdminFields = {}

    Object.keys(admins[1]).forEach(k => {
      secondAdminFields[`administrator_form_2_${k}`] = admins[1][k]
    })

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
              <Dropdown.Item {...options}/>
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
          initialValues={secondAdminFields}
          form='administrator_form_2'
          customButtons={this.renderAdminButtons}
        />
      </React.Fragment>
    )
  }

  renderAdminButtons = pristine => {
    return (
      <div>
        <span>
          The changes were successfully saved!
        </span>
        {!pristine &&
          <button type='button'
          className='btn btn-purple wide-button mb-2'
          onClick={() => this.setState({ adminFirstSaved: true })}
          >
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

  submitProjectAdmin = values => {
    const { updateProject, id } = this.props
    const newValues = {}
    Object.keys(values).forEach(k => {
      const key = k.replace(/administrator_form_\d+_/g, '')
      newValues[key] = values[k]
    })

    updateProject(newValues, id, 'project_admins').then(() => this.toggleModals('adminForm', false))
  }

  render() {
    const { billingForm, adminForm, adminErrorModal, adminInspectModal } = this.state
    const { admins } = this.props
    let firstAdminFields = {}

    Object.keys(admins[0]).forEach(k => {
      firstAdminFields[`administrator_form_1_${k}`] = admins[0][k]
    })

    const options = [
      {
        key: 'edit_details',
        text: 'Edit details',
        icon: pencil,
        onClick: () => this.toggleModals('adminErrorModal', true)
      },
      {
        key: 'settings',
        text: 'Delete',
        icon: trashBucket,
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
              defaultValues={{ ...this.props.company_datum.company_address}}
              customButtons={this.renderCompanyDataButtons}
            />
          </div>
          <div className='col-lg-4'>
            <div className='block-title'> 
              <span>Project administrator 1</span>
              <span className='active-admin'>Active</span>
              <DropDownMenu options={options}/>
            </div>
            <AdministratorForm
              initialValues={firstAdminFields}
              form='administrator_form_1'
              customButtons={this.renderAdminButtons}
            />
          </div>
          <div className='col-lg-4'>
            {this.props.admins.length > 1
              ? this.renderFormSecondAdminColumn()
              : this.renderNewSecondAdminColumn()
            }
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
            form='administrator_form_2'
            customSubmit={(values) => this.submitProjectAdmin(values)}
          />}
      </React.Fragment>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  updateProject: (values, id, step) => dispatch(startUpdateProject(values, id, step))
})

export default connect(null, mapDispatchToProps)(ProjectDetails)
