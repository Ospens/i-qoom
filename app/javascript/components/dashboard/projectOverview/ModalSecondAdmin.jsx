import React, { Component } from 'react'
import AdministratorForm from '../../../elements/forms/AdministratorForm'
import ReactSVG from 'react-svg'
import Left from '../../../images/arrow-button-left'

class ModalSecondAdmin extends Component {

  state = {
    secondAdmin: false
  }

  render() {
    const { closeModal, changeStep, modalTitle } = this.props
    const { secondAdmin } = this.state
    return (
      <div className='new-project-modal'>
        <h4>{modalTitle || 'New project'}</h4>
        {secondAdmin &&
        <AdministratorForm
          {...this.props}
          titleModal='Who is the second project administrator?'
          label='Project second administrator'
          nameForm='create_second_administrator'
          mainClass='modal-body'
        />}
        {!secondAdmin &&
        <div>
          <div className='modal-body'>
          <h6>Would you like to add a second administrator now?</h6>
          <button
            type='button'
            className='btn btn-purple wide-button'
            onClick={() => this.setState({ secondAdmin: true })}
          >
            Add a second administrator
          </button>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
              <ReactSVG
                svgStyle={{ height: 10, width: 10, marginRight: 5 }}
                src={Left}
              />
              Back
            </button>
            <button type='button' className='btn btn-white' onClick={closeModal}>Cancel</button>
            <button
              type='button'
              className='btn btn-purple'
              onClick={() => changeStep(1)}
            >
              Skip
            </button>
          </div>
        </div>

        }
      </div>
    )
  }
}

export default ModalSecondAdmin
