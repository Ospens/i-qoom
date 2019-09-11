import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import DropDown from '../../../../../elements/DropDown'
import MemberRow from './MemberRow'
import {
  getGrantAccessMembers,
  getGrandedAccessMembers
} from '../../../../../actions/accessRightsActions'

const columns = [
  { title: 'Name', divider: true },
  { title: 'Member-ID', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true }
]

const optionBtn = [
  {
    title: 'Define access rights',
    icon: 'share-file-icon'
  },
  {
    title: 'Show profile',
    icon: 'review-icon'
  },
  {
    title: 'Send message',
    icon: 'email-unread-icon'
  },
  {
    title: 'Add to team',
    icon: 'business-team-icon'
  },
  {
    title: 'Add to distribution G.',
    icon: 'business-team-icon'
  },
  {
    title: 'Delete',
    icon: 'trash-icon'
  }
]

function MembersTable({ type, match: { params: { project_id } } }) {
  const dispatch = useDispatch()
  const members = useSelector(state => state.accessRights[type])
  const [checkedMembers, changeChecked] = useState([])
  const fields = useSelector(state => state.accessRights.fields)
  useEffect(() => { 
    changeChecked([])
    if (type === 'newMembers') {
      dispatch(getGrantAccessMembers(project_id))
    } else if (type === 'oldMembers') {
      dispatch(getGrandedAccessMembers(project_id))
    }
  }, [dispatch, type])

  const toggleMemeber = useCallback((value) => {
    let newVal = new Array()
    newVal = newVal.concat(checkedMembers)
    const index = newVal.indexOf(value)

    if (index > -1) {
      newVal.splice(index, 1)
    } else {
      newVal.splice(index, 0, value)
    }
    changeChecked(newVal)
  }, [checkedMembers])

  let optionsText = 'Options'

  if (checkedMembers.length) {
    optionsText += `: ${checkedMembers.length} members selected`
  }

  return (
    <React.Fragment>
      <div><label>Select Access rights for members</label></div>
      <div className='d-flex my-4'>
        <DropDown btnName={optionsText}>
          {optionBtn.map(({ title, icon }, i) => (
            <button type='button' className='dropdown-item btn' key={i}>
              <div>
                <i className={classnames('svg-icon gray mr-2', icon)} />
              </div>
              <span className='item-text'>{title}</span>
            </button>
          ))}
        </DropDown>
        <input
          type='text'
          className='search-input ml-auto'
          placeholder='Search'
        />
      </div>
      <div className='access-rights-table-block'>
        <div>
          <div className='table__header'>
            <div className='table-row header'>
              <div className='table__row-cell header table-checkbox'>
                <div className='d-flex'>
                  <input
                    type='checkbox'
                    id='check_all'
                  />
                  <label htmlFor='check_all' />
                </div>
              </div>
              {columns.map(({ title, divider }) => (
                <div className='table__row-cell header' key={title}>
                  {divider && <span className='divider' />}
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='table__body'>
            {members.map((member, i) => {
              initialize(`members_access_rights_form_${member.id}`, member)
              return (
                <MemberRow 
                  key={member.id}
                  type={type}
                  checkedMembers={checkedMembers}
                  toggleMemeber={toggleMemeber}
                  fields={fields}
                  initialValues={member}
                  form={`members_access_rights_form_${member.id}`}
                />
            )})}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(MembersTable)
