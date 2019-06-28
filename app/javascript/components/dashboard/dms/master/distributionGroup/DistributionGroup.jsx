import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import { RenderTeamlist } from '../accessRights/ShowMembersPopup'

const rows = [
  {
    title: 'Work group Lorem Ipsum Dolor'
  },
  {
    title: 'Work group Lorem Ipsum Dolor'
  },
  {
    title: 'Work group Lorem Ipsum Dolor'
  },
  {
    title: 'Work group Lorem Ipsum Dolor'
  },
  {
    title: 'Work group Lorem Ipsum Dolor'
  }
]

export class DistributionGroup extends Component {

  renderContent = () => {
    return (
      <div className='dms-content bordered'>
        <div className='dms-content__header p-4'>
          <h4>Distribution groups</h4>
          <label>Manage distribution groups</label>
        </div>
        <div className="px-4">
          <Table sortable className='main-table-block'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell >
                  <span>Distribution group</span>
                </Table.HeaderCell>
                <Table.HeaderCell >
                  <span className='divider' />
                  <span>DG-Members</span>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((el, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    <div className="d-flex align-items-center">
                      <div className='team-icon'>
                        <UserAvatar size='42' name='D G' className='group-avatar' />
                      </div>
                      <span className='ml-4'>{el.title}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="dg-members">
                      <RenderTeamlist/>
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

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

export default DistributionGroup
