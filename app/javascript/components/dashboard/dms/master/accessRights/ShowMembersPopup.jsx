import React, { useState } from 'react'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../../elements/DropDown'
import plusIcon from '../../../../../images/add_1'
import showProfileIcon from '../../../../../images/single-neutral-actions-text'
import trashIcon from '../../../../../images/trash_bucket'
import sendIcon from '../../../../../images/email-action-send-2'
import removeFromTeamIcon from '../../../../../images/rating-star-subtract'

const ddOPtions = [
  {
    icon: showProfileIcon,
    title: 'Show profile',
  },
  {
    icon: sendIcon,
    title: 'Send message',
  },
  {
    icon: removeFromTeamIcon,
    title: 'Remove from team',
  },
  {
    icon: trashIcon,
    title: 'Delete',
  },
]

export const RenderTeamlist = () => {
  const [showMore, toggleShowMore] = useState(false)
  const [checkedUser, toggleCheckedUser] = useState(0)
  const tmpUsers = showMore ? [...Array(15)] : [...Array(3)]
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
        <ReactSVG
          svgStyle={{ height: 25, width: 25 }}
          src={plusIcon}
          className='popup-add-team-member'
        />
        <React.Fragment>
          <div className={classnames('team-member-list', { 'opened': checkedUser })}>
            {tmpUsers.map((el, i) => (
              <DropDown
                key={i}
                btnClass='avatar-with-dropdown'
                openState={(open) => toggleCheck(open, i)}
                btnComponent={
                  <div className='d-flex'>
                    < UserAvatar size='42' name={`${i}${i}`} />
                    {i == 1 && <span className="master-star-icon" />}
                  </div>
                }
                className='dropdown-with-icon'
              >
                {ddOPtions.map(({ title, icon }, i) => (
                  <button type='button' className='dropdown-item btn' key={i}>
                    <ReactSVG
                      svgStyle={{ height: 13, width: 13 }}
                      src={icon}
                    />
                    <span className='item-text'>
                      {title}
                    </span>
                  </button>
                ))}
              </DropDown>
            ))}
          </div>
          <button
            type='button'
            className='btn popup-toggle-members-btn shower btn-white-blue'
            onClick={() => toggleShowMore(!showMore)}
          >
            {btnTitle}
          </button>
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}

const ShowMembersPopup = users => {

  return (
    <Popup
      trigger={
        <button
          type='button'
          className='btn ml-auto'
          // onClick={() => toggleShowMore(false)}
        >
          Show members
        </button>
      }
      on='click'
    >
      <div className='tooltip-block'>
        {RenderTeamlist()}
      </div>
    </Popup>
  )
}

export default ShowMembersPopup
