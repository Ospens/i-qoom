import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { getFormSubmitErrors } from 'redux-form'
import InputField from '../../../elements/InputField'
import Left from '../../../images/arrow-button-left'

class ModalProjectName extends Component {

  render() {
    const { submitErrors, closeModal, changeStep, pristine } = this.props

    return (
      <div className='new-project-modal'>
        <h4>New project</h4>
        <div className='modal-body project-name'>
          <h6>What would you like to call this project?</h6>
          <div className='form-group'>
            <InputField
              type='text'
              name='name'
              id='name'
              errorField={submitErrors}
              placeholder='Project title'
              label='Please enter a project title'
            />
          </div>
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
            type='submit'
            className='btn btn-purple'
            disabled={pristine}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state)
})

export default connect(mapStateToProps)(ModalProjectName)
