import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { destroy, reduxForm, formValueSelector, FormSection, getFormSubmitErrors } from 'redux-form'
import NewModal from '../../../elements/Modal'
import Terms from './Terms'
import {
  startCreateProject,
  startFetchProjects,
  startUpdateProject,
} from '../../../actions/projectActions'
import FirstAdmin from './FirstAdmin'
import SecondAdmin from './SecondAdmin'
import ProjectName from './ProjectName'
import CompanyData from './CompanyData'
import Successfull from './Successfull'
import BillingAddress from './BillingAddress'

class ModalCreateProject extends Component {

  state = {
    modalOpen: false,
    step: 1
  }
  
  componentWillMount() {
    const { initialize, user } = this.props
    initialize({ main_admin: { ...user }})
  }
  
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    const { destroyForm, startFetchProjects } = this.props
    this.setState({
      step: 1,
      modalOpen: false
    })
    destroyForm()
    startFetchProjects()
  }

  changeStep = increase => {
    const { step } = this.state

    this.setState({ step: step + increase })
  }

  backStep = sectionName => {
    const { step } = this.state
    const { change } = this.props
    change(sectionName, null)

    this.setState({ step: step - 1 })
  }

  submitChanges = () => {
    const { startCreateProject } = this.props
    startCreateProject()
    .then(() => this.setState({ step: 5 }))
  }

  afterUpdate = (values, changeStep = 1) => {
    const { initialize } = this.props
    const { step } = this.state
    initialize(values)
    this.setState({ step: step + changeStep })
  }

  handleSubmit = values => {
    const {
      startCreateProject,
      updateProject,
      sameBillingAddress,
      change,
      projectId
    } = this.props

    change('main_admin', undefined)
    if (!projectId) {
      return startCreateProject(values, (val) => this.afterUpdate(val))
    } else if (projectId && sameBillingAddress) {
      return updateProject(values, (val) => this.afterUpdate(val, 2))
    } else {
      return updateProject(values, (val) => this.afterUpdate(val))
    }
  }

  renderModalFirstAdmin = () => (
    <FirstAdmin
      closeModal={this.handleClose}
      nextStep={() => this.changeStep(1)}
      projectId={this.props.projectId}
      submitErrors={this.props.submitErrors}
    />
  )

  renderModalSecondAdmin = () => (
    <SecondAdmin
      closeModal={this.handleClose}
      adminsLength={1} // {this.props.admins.length}
      backStep={val => this.backStep(val)}
      submitErrors={this.props.submitErrors}
    />
  )

  renderModalContent = () => {
    const { step } = this.state
    const { terms } = this.props
    const infoModals = step === 1 || step === 7
    const mainClass = classnames('new-modal', { 'without-header': infoModals })
    
    return (
      <form noValidate={true} onSubmit={this.props.handleSubmit(this.handleSubmit)} className={mainClass}>
        {!infoModals && <div className='new-modal__header'><h4>New project</h4></div>}
        {step === 1 &&
        <Terms
          closeModal={this.handleClose}
          termsAccepted={terms}
          nextStep={() => this.changeStep(1)}
        />
        }
        {step === 2 && this.renderModalFirstAdmin()}
        {step === 3 && this.renderModalSecondAdmin()}
        {step === 4 &&
        <ProjectName
          closeModal={this.handleClose}
          backStep={val => this.backStep(val)}
        />}
        {step === 5 &&
        <FormSection name='company_data'>
          <CompanyData
            closeModal={this.handleClose}
            backStep={val => this.backStep(val)}
          />
        </FormSection>}
        {step === 6 &&
        <FormSection name='company_data'>
          <BillingAddress
            closeModal={this.handleClose}
            backStep={val => this.backStep(val)}
          />
        </FormSection>}
        {step === 7 &&
        <Successfull
          closeModal={this.handleClose}
        />}
      </form>
    )
  }

  renderTrigger = () => (
    <div onClick={this.handleOpen}>
      <div className='project-card blank'>
        <i className='svg-icon blue-plus-icon' />
        <label>Create a new project</label>
      </div>
    </div>
  )

  render() {
    const { modalOpen } = this.state

    return (
      <NewModal
        content={this.renderModalContent()}
        trigger={this.renderTrigger()}
        open={modalOpen}
        onClose={this.handleClose}
      />
    )
  }
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  projectId: selector(state, 'id'),
  admins: selector(state, 'admins'),
  terms: selector(state, 'terms'),
  user: state.user,
  sameBillingAddress: selector(state, 'company_data.same_for_billing_address')
})

const mapDispatchToProps = dispatch => ({
  destroyForm: () => dispatch(destroy('project_form')),
  startCreateProject: (values, afterCreate) => dispatch(startCreateProject(values, afterCreate)),
  updateProject: (values, afterUpdate) => dispatch(startUpdateProject(values, afterUpdate)),
  startFetchProjects: () => dispatch(startFetchProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'project_form'
})(ModalCreateProject))

