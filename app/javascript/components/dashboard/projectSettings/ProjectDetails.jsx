import React, { Component } from 'react'
import CompanyForm from '../../../elements/forms/CompanyForm'
import ReactSVG from 'react-svg'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalBillingAddress from '../projectOverview/ModalBillingAddress'
import ModalFirstAdmin from '../projectOverview/ModalFirstAdmin'
import { Dropdown } from 'semantic-ui-react'
import dots from '../../../images/dots-horizontal'
import trash_bucket from '../../../images/trash_bucket'
import pencil from '../../../images/pencil-write'


class ProjectDetails extends Component {

  state = {
    billingForm: false,
    adminForm: false
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

  modalButtonsAdmin = props => {
    return (
      <div className='modal-footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={() => this.toggleModals('billingForm', false)}
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
    <span>
      <ReactSVG
        svgStyle={{ height: 15, width: 15 }}
        src={dots}
      />
    </span>
  )

  render() {
    const { billingForm, adminForm } = this.state
    const options = [
      {
        key: 'user', content: <span><ReactSVG
          svgStyle={{ height: 15, width: 15 }}
          src={dots}
        />Edit details</span> },
      { key: 'settings', text: 'Delete' }
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
              <Dropdown trigger={<ReactSVG
                svgStyle={{ height: 15, width: 15 }}
                src={dots}
              />} options={options} pointing='top right' icon={null} />
            </div>
            <AdministratorForm
              {...this.props}
              nameForm='edit_administrator'
              customButtons={this.renderAdminButtons}
            />
          </div>
          <div className='col-lg-4'>
            <span className='block-title'>
              Project administrator 2
                <span className='wait-confirm-admin'>Awaiting confirmation</span>
            </span>
            <button
              type='button'
              className='btn btn-purple wide-button second-admin'
              onClick={() => this.toggleModals('adminForm', true)}
            >
              Add project administrator
            </button>
          </div>
        </div>
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
 
export default ProjectDetails;