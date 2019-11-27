import React from 'react'
import { formValueSelector } from 'redux-form'
import RightsDropDown from '../../RightsDropDown'

const selector = formValueSelector('team_form')

function AccessRightsTeam({ handleClose }) {
  const fields = useSelector(state => state.accessRights.fields)
  const document_rights = useSelector(state => selector(state, 'document_rights'))

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

export default AccessRightsTeam
