import React, { useState, useCallback } from 'react'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../../elements/DropDown'

const ddOPtions = [
  {
    icon: 'showProfileIcon',
    title: 'Show profile',
  },
  {
    icon: 'sendIcon',
    title: 'Send message',
  },
  {
    icon: 'removeFromTeamIcon',
    title: 'Remove from team',
  },
  {
    icon: 'trashIcon',
    title: 'Delete',
  },
]

function ModalTrigger({ handleOpen }) {
  return (
    <button type='button' className='popup-add-team-member' onClick={handleOpen}>
      <span className='icon-add_1 mr-2' />
    </button>
  )
}

export function Teamlist({ users = [], handleOpen }) {
  const [showMore, toggleShowMore] = useState(false)
  const [checkedUser, toggleCheckedUser] = useState(0)
  const tmpUsers = showMore ? users : users.slice(0, 3)
  const btnTitle = showMore ? 'Show less' : 'Show 12 more'

  const toggleCheck = (open, i) => {
    if (open && i > 0) {
      return toggleCheckedUser(i)
    } else if (!open && checkedUser === i) {
      return toggleCheckedUser(0)
    }
  }

  return (
    <React.Fragment>
      <div className='opened-members-block'>
        <button type='button' className='popup-add-team-member' onClick={handleOpen}>
          <span className='icon-add_1 mr-2' />
        </button>
        <React.Fragment>
          <div className={classnames('team-member-list', { 'opened': checkedUser })}>
            {tmpUsers.map((user, index) => (
              <DropDown
                key={index}
                btnClass='avatar-with-dropdown'
                openState={open => toggleCheck(open, user.id)}
                defaultValues={ddOPtions}
                btnComponent={
                  <div className='d-flex'>
                    <UserAvatar size='42' name={`${user.first_name} ${user.last_name}`} />
                    {user.master && <span className="master-star-icon" />}
                  </div>
                }
                className='dropdown-with-icon'
              />
            ))}
          </div>
          {users.length > 3 &&
          <button
            type='button'
            className='btn popup-toggle-members-btn shower btn-white-blue'
            onClick={() => toggleShowMore(!showMore)}
          >
            {btnTitle}
          </button>}
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

function Trigger({ handleOpen }) {
  return (
    <button
      type='button'
      className='with-icon ml-3'
      onClick={handleOpen}
    >
      <span>
        Show members
      </span>
    </button>
  )
}

function ShowMembersPopup({ users, handleOpen }) {
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(e => {
    if (e.target.closest('.modals')) return

    setOpen(false)
  }, [])

  return (
    <Popup
      trigger={<Trigger handleOpen={() => setOpen(true)} />}
      on='click'
      open={open}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
    >
      <div className='tooltip-block'>
        <Teamlist users={users} handleOpen={handleOpen} />
      </div>
    </Popup>
  )
}

export default ShowMembersPopup
