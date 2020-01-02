import React from 'react'
import { Field } from 'redux-form'
import InputField from '../../../elements/InputField'
import { required } from '../../../elements/validations'

function projectName(closeModal, backStep) {
  return (
    <React.Fragment>
      <div className="new-modal__body">
        <h6 className="new-modal__body-title">
          What would you like to call this project?
        </h6>
        <Field
          name="name"
          id="name"
          component={InputField}
          placeholder="Project title"
          label="Please enter a project title"
          className="form-group"
          validate={[required]}
        />
      </div>
      <div className="new-modal__footer">
        <button type="button" className="btn btn-back" onClick={() => backStep('name')}>
          <span className="icon-arrow-button-left" />
          Back
        </button>
        <button type="button" className="btn btn-white" onClick={closeModal}>Cancel</button>
        <button type="submit" className="btn btn-purple">Next</button>
      </div>
    </React.Fragment>
  )
}

export default projectName
