import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getFormSubmitErrors, formValueSelector } from 'redux-form'
import AdministratorFields from '../../../elements/forms/AdministratorFields'
import ReactSVG from 'react-svg'
import Left from '../../../images/arrow-button-left'


const renderSubmitButtons = (secondAdmin, props) => {
  const { closeModal, changeStep, username, last_name, first_name, email } = props

  const hasEmptyFields = !username || !last_name || !first_name || !email
  return (
    <div className='modal-footer'>
      {!secondAdmin &&
        <button type='button' className='btn btn-back' onClick={() => changeStep(-1)}>
          <ReactSVG
            svgStyle={{ height: 10, width: 10, marginRight: 5 }}
            src={Left}
          />
          Back
        </button>}
      <button
        type='button'
        className='btn btn-white'
        onClick={closeModal}
      >
        Cancel
        </button>
      <button
        type='button'
        className='btn btn-purple'
        onClick={() => changeStep(1)}
        disabled={secondAdmin && hasEmptyFields}
      >
        {secondAdmin ? 'Next' : 'Skip'}
      </button>
    </div>
  )
}

const ModalSecondAdmin = ({ submitErrors, fields, ...props }) => {
  const [secondAdmin, togglesecondAdmin] = useState(false)
  if (secondAdmin && fields.length < 2) fields.push({})

  return (
    <div className='new-project-modal'>
      <h4>New project</h4>
      {secondAdmin &&
        <React.Fragment>
          <div className='modal-body'>
            <h6>Who is the second project administrator?</h6>
            <label className='project-admin'>Project second administrator</label>
            <AdministratorFields submitErrors={submitErrors} admin={'admins_attributes[1]'}/>
          </div>
        </React.Fragment>}
      {!secondAdmin &&
        <div className='modal-body'>
          <h6>Would you like to add a second administrator now?</h6>
          <button
            type='button'
            className='btn btn-purple wide-button'
            onClick={() => togglesecondAdmin(true)}
          >
            Add a second administrator
          </button>
        </div>
      }
      {renderSubmitButtons(secondAdmin, props)}
    </div>
  )
}

const selector = formValueSelector('project_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('project_form')(state),
  username: selector(state, 'admins_attributes[1].username'),
  last_name: selector(state, 'admins_attributes[1].last_name'),
  first_name: selector(state, 'admins_attributes[1].first_name'),
  email: selector(state, 'admins_attributes[1].email')
})

export default connect(mapStateToProps)(ModalSecondAdmin)

