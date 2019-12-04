import React from 'react'
import { Teamlist } from '../accessRights/ShowMembersPopup'

function Teams({ groups = [] }) {
  return (
    <div className="user-profile__info-container">
      <div className="user-profile__info-container_title">Participant in distribution group</div>
      <table className="Rtable">
        <thead className="Rtable__header">
          <tr className="Rtable-row">
            <th className="Rtable__row-cell">
              <div className="Rtable__row-cell__header">
                <span>Team</span>
              </div>
            </th>
            <th className="Rtable__row-cell">
              <div className="Rtable__row-cell__header">
                <span>Members</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="Rtable__body non-stripped">
          {groups.map(group => (
            <tr className="Rtable-row" key={group.name}>
              <td className="Rtable__row-cell">
                {group.name}
              </td>
              <td className="Rtable__row-cell">
                <Teamlist users={group.users} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
