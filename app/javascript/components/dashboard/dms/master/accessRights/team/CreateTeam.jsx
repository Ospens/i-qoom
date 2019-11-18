import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  formValueSelector,
  getFormInitialValues,
  reduxForm,
  Field,
  initialize
} from 'redux-form'
import NewModal from '../../../../../../elements/Modal'
import InputField from '../../../../../../elements/InputField'
import Tabs from '../../../../../../elements/Tabs'
import UsersTable from './UsersTable'

function ModalTrigger({ handleOpen }) {
  return (
    <ul className='buttons-with-icons-list ml-auto'>
      <li>
        <button className='d-flex align-items-center with-icon' onClick={handleOpen}>
          <span className='icon-add_1 mr-2' />
          <span data-title='Create new team'>Create new team</span>
        </button>
      </li>
    </ul>
  )
}

function FirstStep({ handleClose }) {
  return (
    <React.Fragment>

      <div className='new-modal__header'>
        <h4>New Team</h4>
      </div>

      <div className='new-modal__body'>
        <Field
          className='form-group'
          component={InputField}
          name='title'
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

function SecondStep({ handleClose }) {
  return (
    <React.Fragment>
      <div className='new-modal__header'>
        <h4>Dream team name</h4>
      </div>

      <div className='new-modal__body'>
        <Tabs>
          <div label='Add members'>
            <UsersTable />
          </div>
          <div label='Team members'>Team</div>
        </Tabs>
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

function Content({ onSubmit, handleClose, step }) {
  return (
    <form noValidate={true} onSubmit={onSubmit} className='new-modal'>
      {(() => {
        if (step === 1) {
          return <FirstStep handleClose={handleClose} />
        } else if (step === 2) {
          return <SecondStep handleClose={handleClose} />
        }
      })()}
    </form>
  )
}

function CreateTeam({ handleSubmit }) {
  const dispatch = useDispatch()
  const [step, setStep] = useState(2)

  const onSubmit = useCallback(values => {
    if (step < 3) {
      setStep(step + 1)
    }
    console.log(values)
  }, [dispatch, step])

  return (
    <NewModal
      content={<Content handleClose={() => setStep(0)} onSubmit={handleSubmit(onSubmit)} step={step} />}
      trigger={<ModalTrigger handleOpen={() => setStep(1)} />}
      open={step > 0}
      onClose={() => setStep(0)}
      closeOnDimmerClick={false}
    />
  )
}

export default reduxForm({ form: 'team_form' })(CreateTeam)
