import React from 'react'
import { Link } from 'react-router-dom'
import CheckboxField from '../../../elements/CheckboxField'

const terms = (closeModal, termsAccepted, nextStep) => (
  <React.Fragment>
    <div className="modal-body info-modal">
      <h5 className="text-center">
        <span>Please read our</span>
        <Link to="/terms" target="_blank">Terms and Conditions</Link>
        <span>and check the box below</span>
      </h5>

      <div className="checkbox-terms rect-checkbox">
        <CheckboxField
          name="terms"
          checkBoxId="terms"
          labelClass="mr-2"
          text="I have read and agree to the Terms"
        />
      </div>
    </div>
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-white"
        onClick={closeModal}
      >
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-purple"
        disabled={!termsAccepted}
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  </React.Fragment>
)

export default terms
