import React from 'react'
import { Field } from 'redux-form'
import InputField from '../../../elements/InputField'
import { required } from '../../../elements/validations'

function ProjectName({ closeModal, changeStep }) {

  return (
    <React.Fragment>
      <div className='new-modal__body'>
        <h6 className='new-modal__body-title'>
          What would you like to call this project?
        </h6>
        <Field
          name='name'
          id='name'
          component={InputField}
          placeholder='Project title'
          label='Please enter a project title'
          className='form-group'
          validate={[required]}
        />
      </div>
      <div className='new-modal__footer'>
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <i className='svg-icon arrow-left-icon' />
          Back
        </button>
        <button type='button' className='btn btn-white mr-2' onClick={closeModal}>Cancel</button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>
    </React.Fragment>
  )
}

export default ProjectName
