import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'
import UserAvatar from 'react-user-avatar'
import { useParams } from 'react-router-dom'
import DropDown from '../../../../../elements/DropDown'
import { deleteTeamMembers } from '../../../../../actions/accessRightsActions'

const ddOPtions = remove => [
  {
    icon: 'icon-single-neutral-actions-text',
    title: 'Show profile'
  },
  {
    icon: 'icon-email-action-send-2',
    title: 'Send message'
  },
  {
    icon: 'icon-rating-star-subtract',
    title: 'Remove from team',
    onClick: remove
  }
]

export function Teamlist({ users = [], handleOpen, teamId }) {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const [showMore, toggleShowMore] = useState(false)
  const [checkedUser, toggleCheckedUser] = useState(0)
  const tmpUsers = showMore ? users : users.slice(0, 3)
  const btnTitle = showMore ? 'Show less' : `Show ${users.length} more`

  const toggleCheck = useCallback((open, i) => {
    if (open && i > 0) {
      toggleCheckedUser(i)
    } if (!open && checkedUser === i) {
      toggleCheckedUser(0)
    }
  }, [checkedUser])

  const removeFromTeam = useCallback(id => {
    dispatch(deleteTeamMembers(projectId, teamId, id))
  }, [dispatch, projectId, teamId])


  return (
    <React.Fragment>
      <div className="opened-members-block">
        <button type="button" className="popup-add-team-member" onClick={handleOpen}>
          <span className="icon-add_1 mr-2" />
        </button>
        <React.Fragment>
          <div className={classnames('team-member-list', { opened: checkedUser })}>
            {tmpUsers.map(user => {
              const remove = () => removeFromTeam(user.id)
              const button = (
                <div className="d-flex">
                  <UserAvatar size="42" name={`${user.first_name} ${user.last_name}`} />
                  {user.master && <span className="master-star-icon" />}
                </div>
              )
              return (
                <DropDown
                  key={user.id}
                  btnClass="avatar-with-dropdown"
                  openState={open => toggleCheck(open, user.id)}
                  defaultValues={ddOPtions(remove)}
                  btnComponent={button}
                  className="dropdown-with-icon"
                />
              )
            })}
          </div>
          {users.length > 3
          && (
            <button
              type="button"
              className="btn popup-toggle-members-btn shower btn-white-blue"
              onClick={() => toggleShowMore(!showMore)}
            >
              {btnTitle}
            </button>
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

function Trigger({ handleOpen }) {
  return (
    <button
      type="button"
      className="with-icon ml-3"
      onClick={handleOpen}
    >
      <span>
        Show members
      </span>
    </button>
  )
}

function ShowMembersPopup({ users, handleOpen, teamId }) {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(e => {
    if (e.target.closest('.modals')) return

    setOpen(false)
  }, [])

  const trigger = <Trigger handleOpen={() => setOpen(true)} />
  return (
    <Popup
      trigger={trigger}
      on="click"
      open={open}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
    >
      <div className="tooltip-block">
        <Teamlist users={users} handleOpen={handleOpen} teamId={teamId} />
      </div>
    </Popup>
  )
}

export default ShowMembersPopup
