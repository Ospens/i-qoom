import React from 'react'
import { Field } from 'redux-form'
import InputField from '../../../../../../../elements/InputField'

function TeamName({ handleClose }) {
  return (
    <React.Fragment>

      <div className='new-modal__header'>
        <h4>New Team</h4>
      </div>

      <div className='new-modal__body'>
        <Field
          className='form-group'
          component={InputField}
          name='name'
          label='Type in team name'
          placeholder='Team name'
        />
      </div>

      <div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple'>Next</button>
      </div>

    </React.Fragment>
  )
}

export default TeamName
