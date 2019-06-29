import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import { connect } from 'react-redux'
import NewModal from '../../../elements/Modal'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalBillingAddress from '../projectOverview/ModalBillingAddress'
import ModalFirstAdmin from '../projectOverview/ModalFirstAdmin'
import { Dropdown } from 'semantic-ui-react'
import { startUpdateProject, startFetchProject } from '../../../actions/projectActions'
import trashBucket from '../../../images/trash_bucket'
import pencil from '../../../images/pencil-write'
import searchIcon from '../../../images/search-alternate'
import emailSend from '../../../images/email-action-send-2'
import DropDownMenu, { trigger, renderItem } from '../../../elements/DropDownMenu'


class ProjectDetails extends Component {

  state = {
    billingForm: false,
    adminForm: false,
    adminErrorModal: false,
    adminInspectModal: false,
    formSaved: '',
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
        {this.renderSaveButtons(pristine, 'company_datum')}
        <button
          type='button'
          className='btn btn-white-blue wide-button mt-2'
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
        content: renderItem(searchIcon, 'Check status'),
        onClick: () => this.toggleModals('adminInspectModal', true)
      }

    const { admins } = this.props
    let secondAdminFields = {}

    if (admins) {
      Object.keys(admins[1]).forEach(k => {
        secondAdminFields[`${k}`] = admins[1][k]
      })
    }

    const confirmMsg = (
      <div className='msg-card'>
        <span>Do you really want to resend this invitation?</span>
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
        <span>Do you really want to delete the administrator?</span>
        <button className='btn btn-white-grey'>Cancel</button>
        <button className='btn btn-white-red'>Delete</button>
      </div>
    )
    return (
      <React.Fragment>
        <div className='block-title'>
          <span>Project administrator 2</span>
          <span className='wait-confirm-admin'>Awaiting confirmation</span>
          <Dropdown trigger={trigger()} pointing='top right' icon={null}>
            <Dropdown.Menu>
              <Dropdown.Item >
                <Dropdown trigger={renderItem(emailSend, 'Resend email')} pointing='right' icon={null}>
                  <Dropdown.Menu className='confirm-msg'>
                    <Dropdown.Item>{confirmMsg}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Item>
              <Dropdown.Item {...options}/>
              <Dropdown.Item >
                <Dropdown trigger={renderItem(trashBucket, 'Delete')} pointing='right' icon={null}>
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
          customButtons={(pristine) => this.renderSaveButtons(pristine, 'second_admin')}
          customSubmit={(values) => this.submitFormByType(values, 'project_admins')}
        />
      </React.Fragment>
    )
  }

  renderSaveButtons = (pristine, name) => {
    const { formSaved } = this.state
    return (
      <div>
        {(() => {
          if (!pristine) {
            return (
              <button
                type='submit'
                className='btn btn-purple wide-button mb-2'
                onClick={() => this.setState({ formSaved: name })}
              >
                Save changes
              </button>
            )
          } else if (formSaved === name) {
            return (
              <span className='text-success'>
                The changes were successfully saved!
              </span>
            )
          }
        })()}
      </div>
    )
  }

  renderAdminErrorModal = () => (
    <React.Fragment>
      <div className='modal-body terms-modal'>
        <h4>Sorry, you can't do that yet</h4>
        <p>
          Please note that you need two
          <span className='active-admin'>active</span>
          administrators before you can change your
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
    </React.Fragment>
  )

  renderAdminInspectModal = () => (
    <React.Fragment>
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
    </React.Fragment>
  )

  submitFormByType = (values, type) => {
    const { updateProject, id, startFetchProject } = this.props

    return updateProject(values, id, type)
      .then(() => {
        this.toggleModals('adminForm', false)
        this.toggleModals('billingForm', false)
        startFetchProject(id)
      })
  }

  changeKeys = (object, prefix) => {
    const val = {}
    Object.keys(object).forEach(k => {
      val[`${prefix}${k}`] = object[k]
    })
    return val
  }

  render() {
    const { billingForm, adminForm, adminErrorModal, adminInspectModal } = this.state
    const { admins, company_datum } = this.props
    const companyInitial = company_datum
      ? { ...company_datum.company_address, ...company_datum }
      : {}
    const firstAdminFields = admins
      ? admins[0]
      : {}
    const billingInit = company_datum && company_datum.billing_address
      ? this.changeKeys(company_datum.billing_address, 'billing_')
      : {}

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
              initialValues={companyInitial}
              customButtons={this.renderCompanyDataButtons}
              customSubmit={(values) => this.submitFormByType(values, 'company_datum')}
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
              form='administrator_form'
              customButtons={(pristine) => this.renderSaveButtons(pristine, 'first_admin')}
              customSubmit={(values) => this.submitFormByType(values, 'project_admins')}
            />
          </div>
          <div className='col-lg-4'>
            {admins && admins.length > 1
              ? this.renderFormSecondAdminColumn()
              : this.renderNewSecondAdminColumn()
            }
          </div>
        </div>
        <NewModal
          content={this.renderAdminErrorModal()}
          modalOpen={adminErrorModal}
          handleClose={() => this.toggleModals('adminErrorModal', false)}
        />
        <NewModal
          content={this.renderAdminInspectModal()}
          modalOpen={adminInspectModal}
          handleClose={() => this.toggleModals('adminInspectModal', false)}
        />
        <NewModal
          content={
            <ModalBillingAddress
              customButtons={this.modalButtons}
              modalTitle='Billing address'
              initialValues={billingInit}
              customSubmit={(values) => this.submitFormByType(values, 'billing_address')}
            />
          }
          modalOpen={billingForm}
          handleClose={() => this.toggleModals('billingForm', false)}
        />
        <NewModal
        content={
          <ModalFirstAdmin
            customButtons={this.modalButtonsAdmin}
            modalTitle='New project administrator'
            form='administrator_form_2'
            customSubmit={(values) => this.submitFormByType(values, 'project_admins')}
          />
        }
        modalOpen={adminForm}
        handleClose={() => this.toggleModals('adminForm', false)}
        />
      </React.Fragment>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  updateProject: (values, id, step) => dispatch(startUpdateProject(values, id, step)),
  startFetchProject: (id) => dispatch(startFetchProject(id))  
})

export default connect(null, mapDispatchToProps)(ProjectDetails)
