import React, { Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import {
  reduxForm, formValueSelector, FormSection
} from 'redux-form'
import termsAndConditions from './Terms'
import { startCreateProject, startUpdateProject } from '../../../actions/projectActions'
// import FirstAdmin from './FirstAdmin'
// import SecondAdmin from './SecondAdmin'
import projectName from './ProjectName'
import companyData from './CompanyData'
import successfull from './Successfull'
import BillingAddress from './BillingAddress'

const selector = formValueSelector('project_form')

// function ModalFirstAdmin({ initialize, ...props }) {
//   const user = useSelector(state => state.user)
//   const projectId = useSelector(state => selector(state, 'id'))
//   if (!projectId) {
//     initialize({
//       admins: [{
//         username: user.username,
//         email: user.email,
//         first_name: user.first_name,
//         last_name: user.last_name
//       }]
//     })
//   }
//   return <FirstAdmin {...props} />
// }

//
// function ModalSecondAdmin(props) {
//   const admins = useSelector(state => selector(state, 'admins'))
//   return <SecondAdmin {...props} adminCreated={admins.length > 1 && admins[1].id} />
// }

function ModalContent({
  handleSubmit, step, changeStep, change, initialize, handleClose
}) {
  const dispatch = useDispatch()
  const sameBillingAddress = useSelector(state => selector(state,
    'company_data.same_for_billing_address'))
  const terms = useSelector(state => selector(state, 'terms'))
  const projectId = useSelector(state => selector(state, 'id'))
  // const submitErrors = useSelector(state => getFormSubmitErrors('project_form')(state))
  const infoModals = step === 1 || step === 5
  const mainClass = classnames('new-modal', { 'without-header': infoModals })

  const backStep = useCallback(sectionName => {
    change(sectionName, null)
    changeStep(-1)
  }, [change, changeStep])

  const afterUpdate = useCallback((values, stepSize = 1) => {
    initialize(values)
    changeStep(stepSize)
  }, [initialize, changeStep])

  const submit = useCallback(values => {
    if (!projectId) {
      // delete values.admins[0]
      return dispatch(startCreateProject(values, val => afterUpdate(val, 1)))
    } if (projectId && sameBillingAddress) {
      return dispatch(startUpdateProject(values, val => afterUpdate(val, 2)))
    }
    return dispatch(startUpdateProject(values, val => afterUpdate(val, 1)))
  }, [dispatch, projectId, sameBillingAddress, afterUpdate])

  return (
    <form noValidate onSubmit={handleSubmit(submit)} className={mainClass}>
      {!infoModals && <div className="new-modal__header"><h4>Create New Project</h4></div>}
      {(() => {
        if (step === 1) {
          return termsAndConditions(handleClose, terms, () => changeStep(1))
        } if (step === 2) {
          return projectName(handleClose, val => backStep(val))
        } if (step === 3) {
          return (
            <FormSection name="company_data">
              {companyData(handleClose, val => backStep(val))}
            </FormSection>
          )
        } if (step === 4) {
          return (
            <FormSection name="company_data">
              <BillingAddress closeModal={handleClose} backStep={val => backStep(val)} />
            </FormSection>
          )
        } if (step === 5) {
          return successfull(handleClose)
        }
        return <Fragment />
      })()}
    </form>
  )
}

export default reduxForm({ form: 'project_form' })(ModalContent)

/*
* {(() => {
        if (step === 1) {
          return (
            <Terms
              closeModal={handleClose}
              termsAccepted={terms}
              nextStep={() => changeStep(1)}
            />
          )
        } if (step === 2) {
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
        } if (step === 3) {
          return (
            <ModalSecondAdmin
              closeModal={handleClose}
              submitErrors={submitErrors}
              backStep={val => backStep(val)}
            />
          )
        } if (step === 4) {
          return <ProjectName closeModal={handleClose} backStep={val => backStep(val)} />
        } if (step === 5) {
          return (
            <FormSection name="company_data">
              <CompanyData closeModal={handleClose} backStep={val => backStep(val)} />
            </FormSection>
          )
        } if (step === 6) {
          return (
            <FormSection name="company_data">
              <BillingAddress closeModal={handleClose} backStep={val => backStep(val)} />
            </FormSection>
          )
        } if (step === 7) {
          return <Successfull closeModal={handleClose} />
        }
        return <Fragment />
      })()}
* */
