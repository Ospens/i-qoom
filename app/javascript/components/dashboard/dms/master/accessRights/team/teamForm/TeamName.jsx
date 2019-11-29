import React from 'react'
import { Field, formValueSelector } from 'redux-form'
import { useSelector } from 'react-redux'
import InputField from '../../../../../../../elements/InputField'

const selector = formValueSelector('team_form')

function TeamName({ handleClose }) {
  const name = useSelector(state => selector(state, 'name'))
  return (
    <React.Fragment>

      <div className="new-modal__header">
        <h4>{`${name ? (`Edit - ${name}`) : 'New team'}`}</h4>
      </div>

      <div className="new-modal__body">
        <Field
          className="form-group"
          component={InputField}
          name="name"
          label="Type in team name"
          placeholder="Team name"
        />
      </div>

      <div className="new-modal__footer">
        <button
          type="button"
          className="btn btn-white"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-purple">Next</button>
      </div>

    </React.Fragment>
  )
}

export default TeamName
