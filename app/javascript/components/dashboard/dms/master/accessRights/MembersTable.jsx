import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from 'redux-form'
import { withRouter } from 'react-router-dom'
import DropDown from '../../../../../elements/DropDown'
import MemberRow from './MemberRow'
import {
  getGrantAccessMembers,
  getGrandedAccessMembers
} from '../../../../../actions/accessRightsActions'
import toggleArray from '../../../../../elements/toggleArray'


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
    icon: 'icon-common-file-share'
  },
  {
    title: 'Show profile',
    icon: 'icon-single-neutral-actions-text-1'
  },
  {
    title: 'Send message',
    icon: 'icon-email-action-unread'
  },
  {
    title: 'Add to team',
    icon: 'icon-business-team-goal'
  },
  {
    title: 'Add to distribution G.',
    icon: 'icon-business-team-goal'
  },
  {
    title: 'Delete',
    icon: 'icon-bin-1'
  }
]

function MembersTable({ type, match: { params: { projectId } } }) {
  const dispatch = useDispatch()
  const members = useSelector(state => state.accessRights[type])
  const [checkedMembers, changeChecked] = useState([])
  const fields = useSelector(state => state.accessRights.fields)
  useEffect(() => {
    changeChecked([])
    if (type === 'newMembers') {
      dispatch(getGrantAccessMembers(projectId))
    } else if (type === 'oldMembers') {
      dispatch(getGrandedAccessMembers(projectId))
    }
  }, [dispatch, projectId, type])

  const toggleMemeber = useCallback(value => {
    changeChecked(toggleArray(checkedMembers, value))
  }, [checkedMembers])

  let optionsText = 'Options'

  if (checkedMembers.length) {
    optionsText += `: ${checkedMembers.length} members selected`
  }

  return (
    <React.Fragment>
      <div><label>Select Access rights for members</label></div>
      <div className="d-flex my-4">
        <DropDown
          btnName={optionsText}
          defaultValues={optionBtn}
          className="d-flex align-self-center"
        />
        <input
          type="text"
          className="search-input ml-auto"
          placeholder="Search"
        />
      </div>
      <div className="access-rights-table-block">
        <div>
          <div className="table__header">
            <div className="table-row header">
              <div className="table__row-cell header table-checkbox">
                <div className="d-flex">
                  <input
                    type="checkbox"
                    id="check_all"
                  />
                  <label htmlFor="check_all" />
                </div>
              </div>
              {columns.map(({ title, divider }) => (
                <div className="table__row-cell header" key={title}>
                  {divider && <span className="divider" />}
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="table__body">
            {members.map(member => {
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
              )
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default withRouter(MembersTable)
