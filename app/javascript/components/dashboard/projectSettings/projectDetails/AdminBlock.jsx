import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormSubmitErrors } from 'redux-form'
import AdministratorFields from '../../../../elements/forms/AdministratorFields'
import NewModal from '../../../../elements/Modal'
import DropDownMenu from '../../../../elements/DropDownMenu'
import pencil from '../../../../images/pencil-write'
import trashBucket from '../../../../images/trash_bucket'
import { startUpdateProject, startFetchProject } from '../../../../actions/projectActions'

export class AdminBlock extends Component {
  nodeRef = React.createRef()
  options = [
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

  state = {
    adminForm: false
  }

  toggleModals = (key, val) => {
    this.setState({ [key]: val })
  }

  handleSubmit = values => {
    const { updateProject } = this.props
    console.log(values)
    return updateProject(values, () => this.toggleModals('adminForm', false))
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

  renderModal = () => {
    const { submitErrors, index } = this.props

    return (
      <div className='new-project-modal'>
        <h4>New project administrator</h4>
        <div className='modal-body'>
          <h6>Who is the second project administrator?</h6>
          <label className='project-admin'>Second project administrator</label>
          <AdministratorFields
            submitErrors={submitErrors}
            admin={`admins[${index}]`}
          />
        </div>
        {this.modalButtonsAdmin()}
      </div>
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

  renderSaveButtons = type => {
    const { pristine, saved } = this.props

    return (
      <div>
        {(() => {
          if (!pristine) {
            return (
              <button
                type='submit'
                className='btn btn-purple wide-button mb-2'
              >
                Save changes
              </button>
            )
          } else if (saved) {
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

  renderAdminInfo = () => {
    const { submitErrors, index } = this.props
    return (
      <React.Fragment>
        <div className='block-title'>
          <span>Project administrator 1</span>
          <span className='active-admin'>Active</span>
          <DropDownMenu options={this.options} />
        </div>
        <AdministratorFields
          submitErrors={submitErrors}
          admin={`admins[${index}]`}
        />
        {this.renderSaveButtons('admins.0')}
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
          ? this.renderAdminInfo()
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
  updateProject: (values, afterUpdate) => dispatch(startUpdateProject(values, afterUpdate)),
  startFetchProject: id => dispatch(startFetchProject(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  enableReinitialize: true
})(AdminBlock))
