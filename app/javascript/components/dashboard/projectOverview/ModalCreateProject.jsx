import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import ModalTerms from './ModalTerms'
import ModalFirstAdmin from './ModalFirstAdmin'
import ModalSecondAdmin from './ModalSecondAdmin'
import ModalProjectName from './ModalProjectName'
import ModalCompanyData from './ModalCompanyData'
import ModalSuccessfull from './ModalSuccessfull'

class ModalCreateProject extends Component {

  state = {
    step: 1,
    termsAccepted: false,
  }

  changeStep = (increase) => {
    const { step } = this.state
    this.setState({ step: step + increase })
  }

  toogleTerms = () => {
    const { termsAccepted } = this.state
    this.setState({ termsAccepted: !termsAccepted })
  }

  closeModalAndDiscardSteps = () => {
    const { resetForm } = this.props
    const { closeModal } = this.props
    this.setState({ step: 1, termsAccepted: false })
    resetForm('create_project')
    resetForm('create_administrator')
    closeModal()
  }

  render() {
    const { termsAccepted, step } = this.state
    const { isOpen } = this.props
    return (
      <div>
        <div
          className={`modal fade ${isOpen ? 'show' : ''}`}
          id='exampleModalLong'
          tabIndex='-1'
          role='dialog'
          aria-modal='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              {step === 1 &&
                <ModalTerms
                  toogleTerms={this.toogleTerms}
                  closeModal={this.closeModalAndDiscardSteps}
                  termsAccepted={termsAccepted}
                  nextStep={() => this.changeStep(1)}
                />
              }
              {step === 6 &&
                <ModalSuccessfull
                  closeModal={this.closeModalAndDiscardSteps}
                  changeStep={(increase) => this.changeStep(increase)}
                />}
              {step > 1 && step < 6 &&
                <div className='new-project-modal'>
                  <h4>New project</h4>
                {step === 2  &&
                  <ModalFirstAdmin
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
                {step === 3  &&
                  <ModalSecondAdmin
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
                {step === 4  &&
                  <ModalProjectName
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
                {step === 5  &&
                  <ModalCompanyData
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
              </div>
              }
            </div>
          </div>
        </div>
        {isOpen && <div className='modal-backdrop fade show'></div>}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: (formName) => dispatch(reset(formName))
})

export default connect(null, mapDispatchToProps)(ModalCreateProject)
