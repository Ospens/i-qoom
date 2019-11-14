import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'
import {
  getGrantAccessMembers,
  getGrandedAccessMembers
} from '../../../../../actions/accessRightsActions'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../sideBar/DmsSideBar'
import Tabs from '../../../../../elements/Tabs'
import DropDown from '../../../../../elements/DropDown'
import ShowMembersPopup from './ShowMembersPopup'
import NewTeamModal from './ModalTeamForm'
import ModalBulkAccessRights from './ModalBulkAccessRights'
import rightsDropDown from './RightsDropDown'

const columns = [
  { title: 'Name', divider: true },
  { title: 'Member-ID', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true },
  { title: '', divider: true }
]

const optionBtn = [
  {
    title: 'Copy DG-members to team',
    icon: 'review-icon'
  },
  {
    title: 'Synchronize with distribution group',
    icon: 'email-unread-icon'
  },
  {
    title: 'Delete team',
    icon: 'trash-icon'
  }
]

class TeamsAccessRights extends Component {

  state = {
    checkedTeams: [],
    checkedNewTeams: [],
    showMore: false
  }

  UNSAFE_componentWillMount() {
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
      optionsText += `: ${checked.length} teams selected`
    }

    return (
      <React.Fragment>
        <div className='d-flex my-4'>
          <label>Select Access rights for teams</label>
          <input
            type='text'
            className='search-input ml-auto'
            placeholder='Search'
          />
        </div>
        <div className='d-flex my-4'>
          <DropDown btnName={optionsText}>
            <ModalBulkAccessRights users={[]} />
            {optionBtn.map(({ title, icon }, i) => (
              <button type='button' className='dropdown-item btn' key={i}>
                <div>
                  <span className={classnames('mr-2', icon)} />
                </div>
                <span className='item-text'>
                  {title}
                </span>
              </button>
            ))}
          </DropDown>
          <NewTeamModal />
        </div>
        <div className='access-rights-table-block'>
          <Table sortable striped className='main-table-block'>
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
                  <Table.HeaderCell key={title} >
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
                  <Table.Cell className='team-title-column user-info-avatar d-flex'>
                    <div className='user-info-avatar'>
                      <div className='team-icon'>
                        <UserAvatar size='42' name='T' />
                      </div>
                    </div>
                    <div className='user-and-company'>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                      <div className='d-flex'>
                        <button type='button' className='btn pl-0'>Add new members</button>
                        <ShowMembersPopup />
                      </div>
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

                  <Table.Cell className='column-for-dropdown'>
                    <DropDown
                      dots={true}
                      className='dropdown-with-icon'
                      ulClass='left'
                      defaultValues={optionBtn}
                    />
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
    const { newTeams, oldTeams } = this.props

    return (
      <Tabs className='big-tabs'>
        <div label='Teams'>{this.renderMemberTable('checkedTeams', oldTeams)}</div>
        <div label='New teams'>{this.renderMemberTable('checkedNewTeams', newTeams)}</div>
      </Tabs>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={<div>Not available yet.</div>}
      />
    )
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

const mapStateToProps = ({ accessRights }) => ({
  // TODO: change it for teams
  newTeams: accessRights.newMembers,
  oldTeams: accessRights.oldMembers
})

const mapDispatchToProps = dispatch => ({
  // TODO: change it for teams
  getGrantAccessMembers: projectId => dispatch(getGrantAccessMembers(projectId)),
  getGrandedAccessMembers: projectId => dispatch(getGrandedAccessMembers(projectId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'team_access_rights_form'
})(withRouter(TeamsAccessRights)))

