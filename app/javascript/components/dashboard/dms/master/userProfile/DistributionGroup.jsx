import React from 'react'
import { TeamList } from '../accessRights/ShowMembersPopup'

function DistributionGroup({ groups = [] }) {
  return (
    <div className="user-profile__info-container">
      <div className="user-profile__info-container_title">Participant in distribution group</div>
      <div className="user-profile__user_block">
        <table className="Rtable">
          <thead className="Rtable__header">
            <tr className="Rtable-row">
              <th className="Rtable__row-cell">
                <div className="Rtable__row-cell__header">
                  <span>Distribution group</span>
                </div>
              </th>
              <th className="Rtable__row-cell">
                <div className="Rtable__row-cell__header">
                  <span>Participants</span>
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
                  <TeamList users={group.users} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DistributionGroup
