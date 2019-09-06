import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import classnames from 'classnames'
import UserAvatar from 'react-user-avatar'
import { withRouter } from 'react-router-dom'
import {
  getGrantAccessMembers,
  getGrandedAccessMembers
} from '../../../../../actions/accessRightsActions'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import Tabs from '../../../../../elements/Tabs'
import DropDown from '../../../../../elements/DropDown'
import rightsDropDown from './RightsDropDown'

export const columns = [
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
    icon: 'share-file-icon'
  },
  {
    title: 'Show profile',
    icon: 'review-icon'
  },
  {
    title: 'Send message',
    icon: 'email-unread-icon'
  },
  {
    title: 'Add to team',
    icon: 'business-team-icon'
  },
  {
    title: 'Add to distribution G.',
    icon: 'business-team-icon'
  },
  {
    title: 'Delete',
    icon: 'trash-icon'
  }
]

class MembersAccessRights extends Component {

  state = {
    checkedMembers: [],
    checkedNewMembers: []
  }

  componentWillMount() {
    const { getGrantAccessMembers, getGrandedAccessMembers, match: { params: { project_id } } } = this.props
    getGrandedAccessMembers(project_id)
    getGrantAccessMembers(project_id)
  }

  checkItem = (type, value) => {
    const checked = this.state[type]
    let newVal

    if (checked.includes(value)) {
      newVal = checked.filter(el => el !== value)
    } else {
      checked.push(value)
    }

    this.setState({ [type]: newVal || checked })
  }

  toogleUsersRights = () => {
    // TODO: waiting a backend part
  }

  renderMemberTable = (type, data) => {
    const checked = this.state[type]
    let optionsText = 'Options'

    if (checked.length) {
      optionsText += `: ${checked.length} members selected` 
    }

    return (
      <React.Fragment>
        <div><label>Select Access rights for members</label></div>
        <div className='d-flex my-4'>
          <DropDown btnName={optionsText}>
            {optionBtn.map(({title, icon}, i) => (
              <button type='button' className='dropdown-item btn' key={i}>
                <div>
                  <i className={classnames('svg-icon gray mr-2', icon)} />
                </div>
                <span className='item-text'>{title}</span>
              </button>
            ))}
        </DropDown>
        <input
          type='text' 
          className='search-input ml-auto'
          placeholder='Search'
        />
        </div>
        <div className='access-rights-table-block'>
          <Table sortable className='main-table-block'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className='table-checkbox'>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      id='check_all'
                    />
                    <label htmlFor='check_all' />
                  </div>
                </Table.HeaderCell>
                {columns.map(({ title, divider }) => (
                  <Table.HeaderCell
                    key={title}
                  >
                    {divider && <span className='divider' />}
                    <span>{title}</span>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((user, i) => (
                <Table.Row key={i}>
                  <Table.Cell className='table-checkbox'>
                    <div>
                      <input
                        type='checkbox'
                        id={user.id}
                        checked={checked.includes(user.id)}
                        onChange={() => this.checkItem(type, user.id)}
                      />
                      <label htmlFor={user.id} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className='name-column user-info-avatar d-flex'>
                    <div className='user-info-avatar'>
                      {user.team &&
                      <div className="team-icon with-avatar">
                        <UserAvatar size='42' name='T' />
                        <span className='team-length'>{user.team.members || 0}</span>
                      </div>}
                      <UserAvatar size='42' name={`${user.first_name} ${user.last_name}`} />
                    </div>
                    <div className='user-and-company'>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                      <span className='text-secondary'>Company</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{`${user.first_name} Member id`}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {rightsDropDown('FOU', 'Originating company')}
                  </Table.Cell>
                  <Table.Cell>
                    {rightsDropDown('HSE', 'Discipline')}
                  </Table.Cell>
                  <Table.Cell>
                    {rightsDropDown('LOG', 'Document type')}
                  </Table.Cell>
                  <Table.Cell>
                    <span>{user.email}</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        
      </React.Fragment>
    )
  }

  renderContent = () => {
    const { newMembers, oldMembers } = this.props

    return (
      <Tabs className='big-tabs'>
        <div label='Members'>{this.renderMemberTable('checkedMembers', oldMembers)}</div>
        <div label='New members'>{this.renderMemberTable('checkedNewMembers', newMembers)}</div>
      </Tabs>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar/>}
        content={this.renderContent()}
      />
    )
  }
}
const mapStateToProps = ({ accessRights }) => ({
  newMembers: accessRights.newMembers.users,
  oldMembers: accessRights.oldMembers.users
})

const mapDispatchToProps = dispatch => ({
  getGrantAccessMembers: projectId => dispatch(getGrantAccessMembers(projectId)),
  getGrandedAccessMembers: projectId => dispatch(getGrandedAccessMembers(projectId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'members_access_rights_form'
})(withRouter(MembersAccessRights)))

