import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ProjectSettings.scss'
import { startFetchProject } from '../../../actions/projectActions'
import CompanyForm from '../../../elements/forms/CompanyForm'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ModalBillingAddress from '../projectOverview/ModalBillingAddress'

class ProjectSettings extends Component {

  state = {
    billingForm: false
  }

  componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }

  renderSubmitButtons = (pristine) => {
    const { billingForm } = this.state
    return (
      <div>
        {!pristine && 
          <button type='button' className='btn btn-purple wide-button mb-2' >
            Save changes
          </button>}
        <button
          type='submit'
          className='btn btn-white-blue'
          onClick={() => { this.setState({ billingForm: !billingForm }) }}
        >
          Billing address
        </button>
      </div>
    )
  }

  render() {
    const { name } = this.props.project
    const { billingForm } = this.state
    return (
      <div className='project-settings'>
        <h2>Project settings</h2>
        <div>{name}</div>
        <div className='nav-bar'>
          <div className='nav-bar-item'>
            <button className='nav-bar-element active'>
              Project details
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className='nav-bar-element'>
              Member managment
            </button>
          </div>
          <div className='nav-bar-item'>
            <button className='nav-bar-element'>
              Project status
            </button>
          </div>
        </div>
        <React.Fragment>
          <h5 className='tab-title'>Project details</h5>
          <div className='row'>
            <div className='col-lg-4'>
              <span className='block-title'>Company data</span>
              <CompanyForm
                {...this.props}
                customSubmit={(values) => this.handleSubmit(values)}
                customButtons={this.renderSubmitButtons}
              />
            </div>
            <div className='col-lg-4'>
              <span className='block-title'>
                Project administrator 1
                <span className='active-admin'>Active</span>
              </span>
              <AdministratorForm
                {...this.props}
                nameForm='edit_administrator'
                customButtons={() => null}
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
              >
                Add project administrator
              </button>
            </div>
          </div>
        </React.Fragment>
        {billingForm &&
        <div>
          <div
            className='modal fade show'
            id='exampleModalLong'
            tabIndex='-1'
            role='dialog'
            aria-modal='true'
          >
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='new-project-modal'>
                  <h4>Billing address</h4>
                  <ModalBillingAddress
                    closeModal={(this.closeModalAndDiscardSteps)}
                    changeStep={(increase) => this.changeStep(increase)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-backdrop fade show'></div>
        </div>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProject: (id) => dispatch(startFetchProject(id))
})

const mapStateToProps = state => ({
  project: state.projects.current
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSettings)
