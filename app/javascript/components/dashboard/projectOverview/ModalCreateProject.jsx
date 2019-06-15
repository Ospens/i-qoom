import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import NewModal from '../../../elements/Modal'
import ReactSVG from 'react-svg'
import plus from '../../../images/add_1'
import ModalTerms from './ModalTerms'
import { startCreateProject, startFetchProjects } from '../../../actions/projectActions'
import ModalFirstAdmin from './ModalFirstAdmin'
import ModalSecondAdmin from './ModalSecondAdmin'
import ModalProjectName from './ModalProjectName'
import ModalCompanyData from './ModalCompanyData'
import ModalSuccessfull from './ModalSuccessfull'
import ModalBillingAddress from './ModalBillingAddress'

class ModalCreateProject extends Component {

  state = {
    modalOpen: false,
    step: 1,
    termsAccepted: false,
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  changeStep = (increase) => {
    const { step } = this.state
    this.setState({ step: step + increase })
  }

  submitChanges = () => {
    const { startCreateProject } = this.props
    startCreateProject()
    .then(() => this.setState({ step: 5 }))
    .catch(() => ({}))
  }

  toogleTerms = () => {
    const { termsAccepted } = this.state
    this.setState({ termsAccepted: !termsAccepted })
  }

  closeModalAndDiscardSteps = () => {
    const { resetForm, startFetchProjects } = this.props
    this.setState({
      step: 1,
      termsAccepted: false,
      modalOpen: false
    })
    resetForm('project_form')
    resetForm('administrator_form')
    startFetchProjects()
  }

  renderModalContent = () => {
    const { termsAccepted, step } = this.state
    return (
      <React.Fragment>
        {step === 1 &&
          <ModalTerms
            toogleTerms={this.toogleTerms}
            closeModal={this.closeModalAndDiscardSteps}
            termsAccepted={termsAccepted}
            nextStep={() => this.changeStep(1)}
          />
        }
        {step === 2 &&
          <ModalFirstAdmin
            closeModal={this.closeModalAndDiscardSteps}
            customSubmit={() => this.changeStep(1)}
          />
        }
        {step === 3 &&
          <ModalSecondAdmin
            closeModal={this.closeModalAndDiscardSteps}
            customSubmit={() => this.changeStep(1)}
            changeStep={(val) => this.changeStep(val)}
          />
        }
        {step === 4 &&
          <ModalProjectName
            closeModal={this.closeModalAndDiscardSteps}
            customSubmit={() => this.submitChanges()}
            changeStep={(val) => this.changeStep(val)}
          />
        }
        {step === 5 &&
          <ModalCompanyData
            closeModal={this.closeModalAndDiscardSteps}
            customSubmit={(increase) => this.changeStep(increase)}
            changeStep={(val) => this.changeStep(val)}
          />
        }
        {step === 6 &&
          <ModalBillingAddress
            closeModal={this.closeModalAndDiscardSteps}
            customSubmit={() => this.changeStep(1)}
            changeStep={(val) => this.changeStep(val)}
          />
        }
        {step === 7 &&
          <ModalSuccessfull
            closeModal={this.closeModalAndDiscardSteps}
          />
        }
      </React.Fragment>
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
        modalOpen={modalOpen}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: (formName) => dispatch(reset(formName)),
  startCreateProject: () => dispatch(startCreateProject()),
  startFetchProjects: () => dispatch(startFetchProjects())
})

export default connect(null, mapDispatchToProps)(ModalCreateProject)
