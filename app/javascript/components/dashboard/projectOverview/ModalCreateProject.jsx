import React, { Component } from 'react'
import { connect } from 'react-redux'
import { destroy, reduxForm, formValueSelector, FieldArray, FormSection } from 'redux-form'
import NewModal from '../../../elements/Modal'
import ReactSVG from 'react-svg'
import plus from '../../../images/add_1'
import ModalTerms from './ModalTerms'
import {
  startCreateProject,
  startFetchProjects,
  startUpdateProject,
} from '../../../actions/projectActions'
import ModalFirstAdmin from './ModalFirstAdmin'
import ModalSecondAdmin from './ModalSecondAdmin'
import ModalProjectName from './ModalProjectName'
import ModalCompanyData from './ModalCompanyData'
import ModalSuccessfull from './ModalSuccessfull'
import ModalBillingAddress from './ModalBillingAddress'

class ModalCreateProject extends Component {

  state = {
    modalOpen: true,
    step: 1
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

  changeStep = (increase) => {
    const { step } = this.state
    const { change } = this.props

    this.setState({ step: step + increase })
  }

  submitChanges = () => {
    const { startCreateProject } = this.props
    startCreateProject()
    .then(() => this.setState({ step: 5 }))
  }

  afterCreate = values => {
    const { initialize } = this.props
    initialize(values)
    this.setState({ step: 5 })
  }

  afterUpdate = (values, step) => {
    const { initialize } = this.props
    initialize(values)
    this.setState({ step })
  }

  handleSubmit = values => {
    const { step } = this.state
    const {
      startCreateProject,
      updateProject,
      sameBillingAddress,
      projectId
    } = this.props

    if (step < 5 && !projectId) {
      return startCreateProject(values, (val) => this.afterCreate(val))
    } else if (sameBillingAddress && step === 5) {
      return updateProject(values, (val) => this.afterUpdate(val, 7))
    } else if (!sameBillingAddress && step === 5) {
      return updateProject(values, (val) => this.afterUpdate(val, 6))
    } else if (step === 6) {
      return updateProject(values, (val) => this.afterUpdate(val, 7))
    } else {
      return updateProject(values)
    }
  }

  renderModalFirstAdmin = props => (
    <ModalFirstAdmin
      {...props}
      closeModal={this.handleClose}
      nextStep={() => this.changeStep(1)}
    />
  )

  renderModalSecondAdmin = props => (
    <ModalSecondAdmin
      {...props}
      closeModal={this.handleClose}
      changeStep={(val) => this.changeStep(val)}
    />
  )

  renderModalContent = () => {
    const { step } = this.state
    const { terms } = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        {step === 1 &&
        <ModalTerms
          closeModal={this.handleClose}
          termsAccepted={terms}
          nextStep={() => this.changeStep(1)}
        />
        }
        {step === 2 &&
        <FieldArray
          name='admins_attributes'
          component={props => this.renderModalFirstAdmin(props)}
        />
        }
        {step === 3 &&
        <FieldArray
          name='admins_attributes'
          component={props => this.renderModalSecondAdmin(props)}
        />
        }
        {step === 4 &&
        <ModalProjectName
          closeModal={this.handleClose}
          changeStep={(val) => this.changeStep(val)}
        />
        }
        {step === 5 &&
        <FormSection name='company_data_attributes'>
          <ModalCompanyData
            closeModal={this.handleClose}
            changeStep={(val) => this.changeStep(val)}
          />
        </FormSection>
        }
        {step === 6 &&
        <FormSection name='company_data_attributes'>
          <ModalBillingAddress
            closeModal={this.handleClose}
            changeStep={(val) => this.changeStep(val)}
          />
        </FormSection>
        }
        {step === 7 &&
        <ModalSuccessfull
          closeModal={this.handleClose}
        />
        }
      </form>
    )
  }

  renderTrigger = () => (
    <div className='col-sm-4' onClick={this.handleOpen}>
      <div className='project-card blank'>
        <ReactSVG
          svgStyle={{ height: 20, width: 20 }}
          src={plus}
        />
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
  projectId: selector(state, 'id'),
  terms: selector(state, 'terms'),
  sameBillingAddress: selector(state, 'company_data_attributes.same_for_billing_address')
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

