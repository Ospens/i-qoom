import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import moment from 'moment'
import AdministratorFields from '../../../../elements/forms/AdministratorFields'
import NewModal from '../../../../elements/Modal'
import DropDown from '../../../../elements/DropDown'
import pencil from '../../../../images/pencil-write'
import trashBucket from '../../../../images/trash_bucket'
import {
  starUpdateAdmin,
  startDeleteAdmin,
  getAdminInfo,
  startResendConfirmAdmin
} from '../../../../actions/projectActions'

const initialState = {
  adminForm: false,
  adminErrorModal: false,
  adminInspectModal: false,
  formSaved: '',
  confirm: false
}

export class AdminBlock extends Component {
  nodeRef = React.createRef()
  state = initialState

  options = (projectId, adminId) => (
    [
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
        onClick: () => this.props.startDeleteAdmin(projectId, adminId)
      }
    ]
  )


  toggleModals = (key, val) => {
    this.setState({ [key]: val })
  }

  afterUpdate = () => {
    this.toggleModals('adminForm', false)
  }

  handleSubmit = values => {
    const { starUpdateAdmin } = this.props
    return starUpdateAdmin(values).then(this.afterUpdate)
  }

  renderAdminErrorModal = () => (
    <React.Fragment>
      <div className='modal-body info-modal'>
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

  openInspectModal = () => {
    const { projectId, getAdminInfo, initialValues: { admins } } = this.props
    getAdminInfo(projectId, admins[0].id)
    this.toggleModals('adminInspectModal', true)
  }

  renderAdminOptions = admin => {
    const { startDeleteAdmin, startResendConfirmAdmin, projectId } = this.props

    const confirmMsg = (
      <div className='msg-card'>
        <span>Do you really want to resend this invitation?</span>
        <button type='button' className='btn btn-white-grey cancel-button'>
          Cancel
        </button>
        <button
          type='button'
          className='btn btn-white-red'
          onClick={() => startResendConfirmAdmin(projectId, admin.id)}
        >
          Resend
        </button>
      </div>
    )

    const confirmMsgDel = (
      <div className='msg-card'>
        <span>Do you really want to delete the administrator?</span>
        <button type='button' className='btn btn-white-grey cancel-button'>Cancel</button>
        <button
          type='button'
          className='btn btn-white-red'
          onClick={() => startDeleteAdmin(projectId, admin.id)}
        >
          Delete
        </button>
      </div>
    )
    return (
      <DropDown dots={true} className='dropdown-with-icon ml-auto' ulClass='left'>
        {admin.status !== 'active' &&
        <DropDown
          btnClass='dropdown-item btn'
          btnComponent={
            <React.Fragment>
              <div><i className='svg-icon gray email-action-icon-2 mr-2' /></div>
              <span className='item-text'>Resend email</span>
            </React.Fragment>}
          ulClass='confirm-msg'
          className='dropdown-with-icon'
        >
          {confirmMsg}
        </DropDown>}
        <button type='button' className='dropdown-item btn' onClick={this.openInspectModal}>
          <div><i className='svg-icon gray mr-2 search-icon' /></div>
          <span className='item-text'>Check status</span>
        </button>
        <DropDown
          btnClass='dropdown-item btn'
          btnComponent={
            <React.Fragment>
              <div><i className='svg-icon gray email-action-icon-2 mr-2' /></div>
              <span className='item-text'>Delete</span>
            </React.Fragment>}
          ulClass='confirm-msg'
          className='dropdown-with-icon'
        >
          {confirmMsgDel}
        </DropDown>
      </DropDown>
    )
  }

  renderModal = () => {
    const { submitErrors } = this.props

    return (
      <div className='new-project-modal'>
        <h4>New project administrator</h4>
        <div className='modal-body'>
          <h6>Who is the second project administrator?</h6>
          <label className='project-admin'>Second project administrator</label>
          <AdministratorFields
            submitErrors={submitErrors}
            admin='admins[0]'
          />
        </div>
        {this.modalButtonsAdmin()}
      </div>
    )
  }

  renderAdminInspectModal = admin => {
    const title = admin.status === 'active'
      ? 'Active'
      : admin.status === 'awaiting_confirmation'
        ? 'Awaiting Confirmation' : 'Unconfirmed'
        
    return (
      <React.Fragment>
        <div className='modal-body admin-status'>
          <h4>{title}</h4>
          {admin.first_confirmation_sent_at &&
          <div className='admin-status__info-block'>
            <div>An email was successfully sent to</div>
            <div className='admin-status__info-block_email'>
              {admin.email}
            </div>
            <div>{moment(admin.first_confirmation_sent_at).format('MMMM Do YYYY, h:mm a')}</div>
          </div>}
          {admin.confirmation_resent_at &&
          <div className='admin-status__info-block'>
            <div>The email was resent</div>
            <div>{moment(admin.confirmation_resent_at).format('MMMM Do YYYY, h:mm a')}</div>
          </div>}
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
  }

  renderButtonForCreate = () => {
    const { adminForm } = this.state
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
        <NewModal
          mountNode={this.nodeRef.current}
          content={this.renderModal()}
          open={adminForm}
          onClose={() => this.toggleModals('adminForm', false)}
        />
      </React.Fragment>
    )
  }

  renderStatus = status => {
    switch (status) {
      case 'unconfirmed':
        return (
          <span className='uncofirmed-admin'>Unconfirmed</span>
        )
      case 'awaiting_confirmation':
        return (
          <span className='await-confirm-admin'>Awaiting confirmation</span>
        )
      case 'active':
        return (
          <span className='active-admin'>Active</span>
        )
    }
  }

  renderAdminInfo = admin => {
    const { submitErrors, index, pristine } = this.props
    const { adminInspectModal } = this.state

    return (
      <React.Fragment>
        <div className='block-title'>
          <span className='mr-2'>{`Project administrator ${index}`}</span>
          {this.renderStatus(admin.status)}
          {this.renderAdminOptions(admin)}
        </div>
        <AdministratorFields
          submitErrors={submitErrors}
          admin='admins[0]'
        />
        {!pristine &&
        <button
          type='submit'
          className='btn btn-purple wide-button mb-2'
        >
          Save changes
        </button>}
        <NewModal
          content={this.renderAdminInspectModal(admin)}
          open={adminInspectModal}
          onClose={() => this.toggleModals('adminInspectModal', false)}
        />
      </React.Fragment>
    )  
  }

  render() {
    const { initialValues: { admins } } = this.props

    return (
      <form
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className='col-lg-4'
        ref={this.nodeRef}
      >
        {admins[0]
          ? this.renderAdminInfo(admins[0])
          : this.renderButtonForCreate()}
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: { id: state.projects.current.id, admins: [ownProps.admin] },
  submitErrors: getFormSubmitErrors(ownProps.formName)(state),
  form: ownProps.formName,
})

const mapDispatchToProps = dispatch => ({
  starUpdateAdmin: values => dispatch(starUpdateAdmin(values)),
  getAdminInfo: (projectId, adminId) => dispatch(getAdminInfo(projectId, adminId)),
  startResendConfirmAdmin: (projectId, adminId) => dispatch(startResendConfirmAdmin(projectId, adminId)),
  startDeleteAdmin: (projectId, adminId) => dispatch(startDeleteAdmin(projectId, adminId))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  enableReinitialize: true
})(AdminBlock))
