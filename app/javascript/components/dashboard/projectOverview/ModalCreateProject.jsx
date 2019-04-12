import React, { Component } from 'react'
import CreateProjectStepOne from './CreateProjectStepOne'
import CreateProjectStepSecond from './CreateProjectStepSecond'

class ModalCreateProject extends Component {

  state = {
    step: 2,
    termsAccepted: false,
  }

  changeStep = (step) => {
    this.setState({ step: step })
  }

  toogleTerms = () => {
    const { termsAccepted } = this.state
    this.setState({ termsAccepted: !termsAccepted })
  }

  render() {
    const { termsAccepted, step } = this.state
    const { closeModal, isOpen } = this.props
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
              {step === 1 && <CreateProjectStepOne toogleTerms={this.toogleTerms}/>}
              {step === 2 && <CreateProjectStepSecond toogleTerms={this.toogleTerms}/>}
              <div className='modal-footer'>
                <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
                <button type='button' className='btn btn-purple' disabled={!termsAccepted} onClick={() => this.changeStep(step+1)}>Next</button>
              </div>
            </div>
          </div>
        </div>
        {isOpen && <div className='modal-backdrop fade show'></div>}
      </div>
    )
  }
}

export default ModalCreateProject
