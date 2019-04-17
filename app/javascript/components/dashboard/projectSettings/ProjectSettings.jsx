import React, { Component } from 'react'
import { connect } from 'react-redux'
import './ProjectSettings.scss'
import { startFetchProject } from '../../../actions/projectActions'
import CompanyForm from '../../../elements/forms/CompanyForm'
import AdministratorForm from '../../../elements/forms/AdministratorForm'

class ProjectSettings extends Component {

  componentWillMount() {
    const { startFetchProject } = this.props
    const { project_id } = this.props.match.params
    startFetchProject(project_id)
  }

  renderSubmitButtons = (pristine) => {
    console.log(pristine)
    return (
      <div>
        {!pristine && 
          <button type='button' className='btn btn-purple wide-button mb-2' >
            Save changes
          </button>}
        <button type='submit' className='btn btn-white-blue'>Billing address</button>
      </div>
    )
  }

  render() {
    const { name } = this.props.project
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
