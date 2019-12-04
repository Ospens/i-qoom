import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import ModalCopyToDG from './ModalCopyToDG'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../sideBar/DmsSideBar'
import DropDown from '../../../../../elements/DropDown'
import { Teamlist } from '../accessRights/ShowMembersPopup'

function Content() {
  const groups = useSelector(({ distributionGroups }) => distributionGroups.dgGroups)

  return (
    <div className="dms-content bordered">
      <div className="dms-content__header">
        <h4>Distribution groups</h4>
        <label>Manage distribution groups</label>
      </div>
      <div className="px-4">
        <Table sortable striped className="main-table-block">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <span>Distribution group</span>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <span className="divider" />
                <span>DG-Members</span>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {groups.map(group => (
              <Table.Row key={group.id}>
                <Table.Cell>
                  <div className="d-flex align-items-center">
                    <div className="team-icon">
                      <UserAvatar size="42" name="D G" className="group-avatar" />
                    </div>
                    <span className="ml-4">{group.title}</span>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="dg-members">
                    <Teamlist users={group.members} />
                    <DropDown
                      dots
                      className="dropdown-with-icon"
                      ulClass="left"
                    >
                      <button
                        type="button"
                        className="dropdown-item btn"
                        // onClick={this.handleOpen}
                      >
                        <span className="icon-common-file-share" />
                        <span className="item-text">
                            Edit DG / add DG-members
                        </span>
                      </button>
                      <ModalCopyToDG groupId={group.id} />
                    </DropDown>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

function DistributionGroup() {
  const sidebar = <DmsSideBar />
  const content = <Content />
  return (
    <DMSLayout
      sidebar={sidebar}
      content={content}
    />
  )
}

export default DistributionGroup
