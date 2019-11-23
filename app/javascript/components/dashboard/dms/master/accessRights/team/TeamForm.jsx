import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  formValueSelector,
  FieldArray,
  reduxForm,
  Field,
} from 'redux-form'
import UsersTable from './UsersTable'
import RightsDropDown from '../RightsDropDown'
import { createTeam, updateTeamMembers } from '../../../../../../actions/accessRightsActions'
import NewModal from '../../../../../../elements/Modal'
import InputField from '../../../../../../elements/InputField'
import Tabs from '../../../../../../elements/Tabs'

const selector = formValueSelector('team_form')

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

function SecondStep({ handleClose, fields }) {
  const name = useSelector(state => selector(state, 'name'))
  /* let submitText = 'Add'
  if (grantAccess.length && grandedAccess.length) {
    submitText = `Add ${grantAccess.length} member(s) and remove ${grandedAccess.length} member(s)`
  } else if (grantAccess.length) {
    submitText = `Add ${grantAccess.length} member(s)`
  } else if (grandedAccess.length) {
    submitText = `Remove ${grandedAccess.length} member(s)`
  } */
  return (
    <React.Fragment>
      <div className='new-modal__header'>
        <h4>{name || 'Untitled'} name</h4>
      </div>

      <div className='new-modal__body'>
        <Tabs>
          <div label='Add members'>
            <UsersTable fieldsArray={fields}/>
          </div>
          <div label='Team members'>Team</div>
        </Tabs>
      </div>

      <div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white mr-auto'
          onClick={handleClose}
        >
          Back
        </button>
        <button
          type='button'
          className='btn btn-white mx-auto'
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type='submit' className='btn btn-purple mx-auto'>Create team with 2 selected members</button>
        <button type='submit' className='btn btn-purple ml-auto'>Define access rights</button>
      </div>

    </React.Fragment>
  )
}

function ThirdStep({ handleClose }) {
  const fields = useSelector(state => state.accessRights.fields)
  console.log(fields)
  return (
    <React.Fragment>
      <div className='new-modal__header'>
        <h4>Define access for Dream team</h4>
      </div>

      <div className='new-modal__body'>
        {/* <RightsDropDown
          values={fields.document_type}
          rights={member.document_rights}
          columnTitle='Document type'
        /> */}
      </div>

      <div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white'
          onClick={handleClose}
        >
          Skip
        </button>
        <button type='submit' className='btn btn-purple'>Apply</button>
      </div>

    </React.Fragment>
  )
}

function Content({ onSubmit, handleClose, step }) {
  return (
    <form noValidate={true} onSubmit={onSubmit} className='new-modal wide'>
      {(() => {
        if (step === 1) {
          return <FirstStep handleClose={handleClose} />
        } else if (step === 2) {
          return (
            <FieldArray
              name='users'
              handleClose={handleClose}
              component={SecondStep}
            />)
        } else if (step === 3) {
          return <ThirdStep handleClose={handleClose} />
        }
      })()}
    </form>
  )
}

function TeamForm({ handleSubmit }) {
  const dispatch = useDispatch()
  const { project_id } = useParams()
  const [step, setStep] = useState(0)

  const onSubmit = useCallback(values => {
    if (step < 2) {
      dispatch(createTeam(project_id, values)).then(() => setStep(step + 1))
    } else if (step < 3) {
      dispatch(updateTeamMembers(project_id, values)).then(() => setStep(step + 1))
    }
    console.log(values)
  }, [dispatch, step, project_id])

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

export default reduxForm({ form: 'team_form' })(TeamForm)
