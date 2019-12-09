import React from 'react'
import { TeamList } from '../accessRights/ShowMembersPopup'

function Teams({ teams = [] }) {
  return (
    <div className="user-profile__info-container">
      <div className="user-profile__info-container_title">Member in teams</div>
      <div className="user-profile__user_block">
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
            {teams.map(team => (
              <tr className="Rtable-row" key={team.name}>
                <td className="Rtable__row-cell">
                  {team.name}
                </td>
                <td className="Rtable__row-cell">
                  <TeamList users={team.users} teamId={team.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teams
