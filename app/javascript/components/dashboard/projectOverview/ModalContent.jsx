import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import {  reduxForm, formValueSelector, FormSection, getFormSubmitErrors } from 'redux-form'
import Terms from './Terms'
import { startCreateProject, startUpdateProject } from '../../../actions/projectActions'
import FirstAdmin from './FirstAdmin'
import SecondAdmin from './SecondAdmin'
import ProjectName from './ProjectName'
import CompanyData from './CompanyData'
import Successfull from './Successfull'
import BillingAddress from './BillingAddress'

const selector = formValueSelector('project_form')

function ModalFirstAdmin({ initialize, ...props }) {
  const user = useSelector(state => state.user)
  const projectId = useSelector(state => selector(state, 'id'))
  if (!projectId) {
    initialize({
      admins: [{
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }]
    })
  }
  return <FirstAdmin {...props} />
}

function ModalSecondAdmin(props) {
  const admins = useSelector(state => selector(state, 'admins'))
  return <SecondAdmin {...props} adminCreated={admins.length > 1 && admins[1].id} />
}

function ModalContent({ handleSubmit, step, changeStep, change, initialize, handleClose }) {
  const dispatch = useDispatch()
  const sameBillingAddress = useSelector(state => selector(state, 'company_data.same_for_billing_address'))
  const terms = useSelector(state => selector(state, 'terms'))
  const projectId = useSelector(state => selector(state, 'id'))
  const submitErrors = useSelector(state => getFormSubmitErrors('project_form')(state))
  const infoModals = step === 1 || step === 7
  const mainClass = classnames('new-modal', { 'without-header': infoModals })

  const backStep = useCallback(sectionName => {
    change(sectionName, null)
    changeStep(-1)
  }, [dispatch, changeStep])

  const afterUpdate = useCallback((values, stepSize = 1) => {
    initialize(values)
    changeStep(stepSize)
  }, [dispatch, changeStep])

  const submit = useCallback(values => {
    if (!projectId) {
      delete values.admins[0]
      return dispatch(startCreateProject(values, (val) => afterUpdate(val, 1)))
    } else if (projectId && sameBillingAddress) {
      return dispatch(startUpdateProject(values, (val) => afterUpdate(val, 2)))
    } else {
      return dispatch(startUpdateProject(values, (val) => afterUpdate(val, 1)))
    }
  }, [dispatch, projectId, sameBillingAddress, afterUpdate])

  return (
    <form noValidate={true} onSubmit={handleSubmit(submit)} className={mainClass}>
      {!infoModals && <div className='new-modal__header'><h4>Create New Project</h4></div>}
      {(() => {
        if (step === 1) {
          return (
            <Terms
              closeModal={handleClose}
              termsAccepted={terms}
              nextStep={() => changeStep(1)}
            />
          )
        } else if (step === 2) {
          return (
            <ModalFirstAdmin
              nextStep={() => changeStep(1)}
              closeModal={handleClose}
              submitErrors={submitErrors}
              projectId={projectId}
              initialize={initialize}
              backStep={val => backStep(val)}
            />
          )
        } else if (step === 3) {
          return (
            <ModalSecondAdmin
              closeModal={handleClose}
              submitErrors={submitErrors}
              backStep={val => backStep(val)}
            />
          )
        } else if (step === 4) {
          return <ProjectName closeModal={handleClose} backStep={val => backStep(val)} />
        } else if (step === 5) {
          return (
            <FormSection name='company_data'>
              <CompanyData closeModal={handleClose} backStep={val => backStep(val)} />
            </FormSection>
          )
        } else if (step === 6) {
          return (
            <FormSection name='company_data'>
              <BillingAddress closeModal={handleClose} backStep={val => backStep(val)} />
            </FormSection>
          )
        } else if (step === 7) {
          return <Successfull closeModal={handleClose} />
        }
      })()}
    </form>
  )
}

export default reduxForm({ form: 'project_form' })(ModalContent)
