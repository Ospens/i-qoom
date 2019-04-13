import React, { Component } from 'react'
import CreateProjectStepFirst from './CreateProjectStepFirst'
import CreateProjectStepSecond from './CreateProjectStepSecond'
import CreateProjectStepThird from './CreateProjectStepThird'
import CreateProjectStepFourth from './CreateProjectStepFourth'
import CreateProjectStepFifth from './CreateProjectStepFifth'

class ModalCreateProject extends Component {

  state = {
    step: 4,
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
    const { closeModal } = this.props
    this.setState({ step: 1 })
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
                <CreateProjectStepFirst
                  toogleTerms={this.toogleTerms}
                  closeModal={this.closeModalAndDiscardSteps}
                  termsAccepted={termsAccepted}
                  nextStep={() => this.changeStep(1)}
                />
              }
              {step === 5 &&
                <CreateProjectStepFifth
                  closeModal={this.closeModalAndDiscardSteps}
                  changeStep={(increase) => this.changeStep(increase)}
                />}
              {step > 1 && step < 5 &&
                <div className='new-project-modal'>
                  <h4>New project</h4>
                {step === 2  &&
                  <CreateProjectStepSecond
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
                {step === 3  &&
                  <CreateProjectStepThird
                    closeModal={this.closeModalAndDiscardSteps}
                    changeStep={(increase) => this.changeStep(increase)}
                  />}
                {step === 4  &&
                  <CreateProjectStepFourth
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

export default ModalCreateProject
