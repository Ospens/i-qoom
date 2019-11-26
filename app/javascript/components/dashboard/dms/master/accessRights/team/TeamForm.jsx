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
import {
  createTeam,
  updateTeamMembers,
  updateTeam,
  updateTeamRights
} from '../../../../../../actions/accessRightsActions'
import NewModal from '../../../../../../elements/Modal'
import InputField from '../../../../../../elements/InputField'
import Tabs from '../../../../../../elements/Tabs'

const selector = formValueSelector('team_form')

function ModalTrigger({ handleOpen }) {
  return (
    <ul className='buttons-with-icons-list ml-auto'>
      <li className='p-0'>
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

function SecondStep({ handleClose, fields, handleSubmit, onSubmit, handleBack }) {
  const name = useSelector(state => selector(state, 'name'))
  const submitText = `Create team with ${fields.length} member(s)`
  
  return (
    <React.Fragment>
      <div className='new-modal__header'>
        <h4>{name || 'Untitled'} name</h4>
      </div>

      <div className='new-modal__body'>
        <Tabs>
          <div label='Add members'>
            <UsersTable fieldsArray={fields} />
          </div>
          <div label='Team members'>Team</div>
        </Tabs>
      </div>

      <div className='new-modal__footer'>
        <button
          type='button'
          className='btn btn-white mr-auto'
          onClick={handleBack}
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
        <button
          type='submit' 
          className='btn btn-purple mx-auto' disabled={fields.length < 1}
          onClick={handleSubmit(values => onSubmit({ ...values, skipAccess: true }))}
        >
          {submitText}
        </button>
        <button type='submit' className='btn btn-purple ml-auto' disabled={fields.length < 1}>Define access rights</button>
      </div>

    </React.Fragment>
  )
}

function ThirdStep({ handleClose }) {
  const fields = useSelector(state => state.accessRights.fields)
  const document_rights = useSelector(state => selector(state, 'document_rights'))
  console.log(fields)
  return (
    <React.Fragment>
      <div className='new-modal__header'>
        <h4>Define access for Dream team</h4>
      </div>

      <div className='new-modal__body'>
        <div className='team-form-rights-row'>
          <div>
            <div className='team-form-rights-row__column-title'>Originating company</div>
            <RightsDropDown
              values={fields.originating_company}
              rowId={1}
              rights={document_rights}
              columnTitle='Originating company'
            />
          </div>
          <div className='team-form-rights-row__column-title'>
            <div>Discipline</div>
            <RightsDropDown
              values={fields.discipline}
              rowId={2}
              rights={document_rights}
              columnTitle='Discipline'
            />
          </div>
          <div className='team-form-rights-row__column-title'>
            <div>Document type</div>
            <RightsDropDown
              values={fields.document_type}
              rowId={1}
              rights={document_rights}
              columnTitle='Document type'
            />
          </div>
        </div>
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

function Content({ os, hs, onSubmit, handleClose, step, handleBack }) {
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
              handleSubmit={hs}
              onSubmit={os}
              handleBack={handleBack}
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
      values.id 
        ? dispatch(updateTeam(project_id, values)).then(() => setStep(step + 1))
        : dispatch(createTeam(project_id, values)).then(() => setStep(step + 1))
    } else if (step < 3 && values.skipAccess) {
      dispatch(updateTeamMembers(project_id, values)).then(() => setStep(0))
    } else if (step < 3) {
      dispatch(updateTeamMembers(project_id, values)).then(() => setStep(step + 1))
    } else if (step < 4) {
      dispatch(updateTeamRights(project_id, values)).then(() => setStep(0))
    }
  }, [dispatch, step, project_id])

  return (
    <NewModal
      content={
      <Content
        handleClose={() => setStep(0)}
        handleBack={() => setStep(step - 1)}
        onSubmit={handleSubmit(onSubmit)} step={step}
        hs={handleSubmit}
        os={onSubmit} 
      />}
      trigger={<ModalTrigger handleOpen={() => setStep(1)} />}
      open={step > 0}
      onClose={() => setStep(0)}
      closeOnDimmerClick={false}
    />
  )
}

export default reduxForm({ form: 'team_form' })(TeamForm)

/* let submitText = 'Add'
if (grantAccess.length && grandedAccess.length) {
  submitText = `Add ${grantAccess.length} member(s) and remove ${grandedAccess.length} member(s)`
} else if (grantAccess.length) {
  submitText = `Add ${grantAccess.length} member(s)`
} else if (grandedAccess.length) {
  submitText = `Remove ${grandedAccess.length} member(s)`
} */