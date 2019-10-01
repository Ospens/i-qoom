import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import moment from 'moment'
import AdministratorFields from '../../../../elements/forms/AdministratorFields'
import NewModal from '../../../../elements/Modal'
import DropDown from '../../../../elements/DropDown'
import {
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
  state = initialState

  toggleModals = (key, val) => {
    this.setState({ [key]: val })
  }

  handleSubmit = values => {
    const { updateAdmin } = this.props
    return updateAdmin(values)
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

  openInspectModal = () => {
    const { projectId, getAdminInfo, admin } = this.props
    getAdminInfo(projectId, admin.id)
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
          <li className='dropdown-item'>
            <DropDown
              className='dropdown-submenu'
              btnClass='dropdown-submenu'
              ulClass='confirm-msg'
              btnComponent={
                <React.Fragment>
                  <div className='icon-container'>
                    <span className='icon-email-action-send-2' />
                  </div>
                  <span className='item-text'>Resend email</span>
                </React.Fragment>}
            >
              {confirmMsg}
          </DropDown>
        </li>}
        <button type='button' className='dropdown-item btn' onClick={this.openInspectModal}>
          <div className='icon-container'>
            <span className='icon-search-alternate' />
          </div>
          <span className='item-text'>Check status</span>
        </button>
        <li className='dropdown-item'>
          <DropDown
            className='dropdown-submenu'
            btnClass='dropdown-submenu'
            ulClass='confirm-msg'
            btnComponent={
              <React.Fragment>
                <div className='icon-container'>
                  <span className='icon-bin-1' />
                </div>
                <span className='item-text'>
                  Delete
                </span>
              </React.Fragment>
            }
          >
            {confirmMsgDel}
          </DropDown>
        </li>
      </DropDown>
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

  render() {
    const { submitErrors, index, pristine, admin } = this.props
    const { adminInspectModal } = this.state

    return (
      <form
        noValidate={true} 
        onSubmit={this.props.handleSubmit(this.handleSubmit)}
        className='mb-2'
      >
        <div className='block-title'>
          <span className='mr-2'>{`Project administrator ${index}`}</span>
          {this.renderStatus(admin.status)}
          {this.renderAdminOptions(admin)}
        </div>
        <AdministratorFields submitErrors={submitErrors} />
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
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  submitErrors: getFormSubmitErrors(ownProps.formName)(state)
})

const mapDispatchToProps = dispatch => ({
  getAdminInfo: (projectId, adminId) => dispatch(getAdminInfo(projectId, adminId)),
  startResendConfirmAdmin: (projectId, adminId) => dispatch(startResendConfirmAdmin(projectId, adminId)),
  startDeleteAdmin: (projectId, adminId) => dispatch(startDeleteAdmin(projectId, adminId))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  enableReinitialize: true
})(AdminBlock))
