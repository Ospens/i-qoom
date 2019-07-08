import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetSection } from 'redux-form'
import { Dropdown } from 'semantic-ui-react'
import NewModal from '../../../../elements/Modal'
import AdministratorFields from '../../../../elements/forms/AdministratorFields'
import AdministratorForm from '../../../../elements/forms/AdministratorForm'
import ModalFirstAdmin from '../../projectOverview/ModalFirstAdmin'
import { startUpdateProject, startFetchProject } from '../../../../actions/projectActions'
import trashBucket from '../../../../images/trash_bucket'
import pencil from '../../../../images/pencil-write'
import searchIcon from '../../../../images/search-alternate'
import emailSend from '../../../../images/email-action-send-2'
import DropDownMenu, { trigger, renderItem } from '../../../../elements/DropDownMenu'
import CompanyBlock from './CompanyBlock'
import AdminBlock from './AdminBlock'


class ProjectDetails extends Component {
  nodeRef = React.createRef()

  state = {
    adminForm: false,
    adminErrorModal: false,
    adminInspectModal: false,
    formSaved: '',
    confirm: false
  }
    
  toggleModals = (key, val) => {
    this.setState({ [key]: val })
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
          customButtons={(pristine) => this.renderSaveButtons('admins[1]')}
          customSubmit={(values) => this.submitFormByType(values, 'project_admins')}
        />
      </React.Fragment>
    )
  }

  renderSaveButtons = type => {
    const { getFormMeta } = this.props
    if (type !== 'company_data') return
    console.log(getFormMeta)
    const sectionChanged = getFormMeta && getFormMeta[type]

    return (
      <div>
        {(() => {
          if (sectionChanged) {
            return (
              <button
                type='submit'
                className='btn btn-purple wide-button mb-2'
                onClick={() => this.setState({ formSaved: type })}
              >
                Save changes
              </button>
            )
          } else if (sectionChanged) {
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

  handleSubmit = values => {
    const { formSaved } = this.state
    console.log(formSaved)
    console.log(values)
  }

  renderAdmins = ({ fields, ...props }) => {
    const { submitErrors } = this.props

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
        {fields.map((field, i) => (
          <div className='col-lg-4' key={i}>
            <div className='block-title'>
              <span>Project administrator 1</span>
              <span className='active-admin'>Active</span>
              <DropDownMenu options={options} />
            </div>
            <AdministratorFields
              submitErrors={submitErrors}
              admin={field}
            />
            {this.renderSaveButtons('admins.0')}
          </div>)
        )}
        {fields.length < 2 &&
          <div className='col-lg-4'>
          {this.renderNewSecondAdminColumn()}
        </div>}
      </React.Fragment>
    )
  }

  render() {
    const { adminForm, adminErrorModal, adminInspectModal } = this.state
    const { current } = this.props
    return (
      <div>
        <h5 className='tab-title'>Project details</h5>
        <div className='row'>
          <CompanyBlock />
          <AdminBlock index={0} admin={current.admins[0]} formName='first_admin_form' />
          <AdminBlock index={1} admin={current.admins[1]} formName='second_admin_form'  />
          {/*<SecondAdminBlock />*/}
        </div>
        <NewModal
          content={this.renderAdminErrorModal()}
          open={adminErrorModal}
          onClose={() => this.toggleModals('adminErrorModal', false)}
        />
        <NewModal
          content={this.renderAdminInspectModal()}
          open={adminInspectModal}
          onClose={() => this.toggleModals('adminInspectModal', false)}
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
          open={adminForm}
          onClose={() => this.toggleModals('adminForm', false)}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ projects }) => ({
  current: projects.current
})

const mapDispatchToProps = dispatch => ({
  resetSection: () => dispatch(resetSection('company_data_attributes')),
  startCreateProject: (values, afterCreate) => dispatch(startCreateProject(values, afterCreate)),
  updateProject: (values, afterUpdate) => dispatch(startUpdateProject(values, afterUpdate)),
  startFetchProject: id => dispatch(startFetchProject(id))  
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
