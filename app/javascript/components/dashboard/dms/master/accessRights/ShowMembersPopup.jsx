import React, { useState } from 'react'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../../elements/DropDown'
import plusIcon from '../../../../../images/add_1'

const ShowMembersPopup = users => {
  const [showMore, toggleShowMore] = useState(false)
  const [checkedUser, toggleCheckedUser] = useState(0)
  const tmpUsers = showMore ? [...Array(15)] : [...Array(3)]
  const btnTitle = showMore ?  'Show less' : 'Show 12 more'

  // TODO: change this
  const toggleCheck = (open, i) => {
    if (open && checkedUser > 0) return toggleCheckedUser(i)
    toggleCheckedUser(0)
  }
  console.log(checkedUser)

  return (
    <Popup
      trigger={
        <button
          type='button'
          className='btn ml-auto'
          onClick={() => toggleShowMore(false)}
        >
          Show members
        </button>
      }
      on='click'
    >
      <div className='tooltip-block'>
        <div className='show-members-popup'>
          <ReactSVG
            svgStyle={{ height: 25, width: 25 }}
            src={plusIcon}
            className='popup-add-team-member'
          />
          <React.Fragment>
            <div className={classnames('popup-team-member-list', { 'opened': checkedUser })}>
              {tmpUsers.map((el, i) => (
                <DropDown
                  key={i}
                  btnClass='avatar-with-dropdown'
                  openState={(open) => toggleCheck(open, i)}
                  btnComponent={
                    <UserAvatar size='42' name={`${i}${i}`} />
                  }
                  className='dropdown-with-icon'
                >
                  test
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
      </div>
    </Popup>
  )
}

export default ShowMembersPopup
