import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import ReactSVG from 'react-svg'
import UserAvatar from 'react-user-avatar'
import {
  getGrantAccessMembers,
  getGrandedAccessMembers
} from '../../../../../actions/accessRightsActions'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import Tabs from '../../../../../elements/Tabs'
import DropDown from '../../../../../elements/DropDown'
import accessRightsIcon from '../../../../../images/common-file-share'
import showProfileIcon from '../../../../../images/single-neutral-actions-text'
import messageIcon from '../../../../../images/email-action-unread'
import groupIcon from '../../../../../images/business-team-goal'
import trashIcon from '../../../../../images/trash_bucket'

export const columns = [
  { title: 'Name', divider: true },
  { title: 'Member-ID', divider: true },
  { title: 'Originating Company', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Document type', divider: true },
  { title: 'Timelimit', divider: true }
]

const disciplineList = [
  {
    label: 'FOU',
    enable: true,
    view_only: true
  },
  {
    label: 'HSE',
    enable: true,
    view_only: true
  },
  {
    label: 'LOG',
    enable: true,
    view_only: false
  },
  {
    label: 'SAA',
    enable: false,
    view_only: false
  },
  {
    label: 'SOO',
    enable: false,
    view_only: false
  },
  {
    label: 'TTT',
    enable: false,
    view_only: false
  },
  {
    label: 'XXX',
    enable: false,
    view_only: false
  },
  {
    label: 'YYY',
    enable: false,
    view_only: false
  },
]

const optionBtn = [
  {
    title: 'Define access rights',
    icon: accessRightsIcon
  },
  {
    title: 'Show profile',
    icon: showProfileIcon
  },
  {
    title: 'Send message',
    icon: messageIcon
  },
  {
    title: 'Add to team',
    icon: groupIcon
  },
  {
    title: 'Add to distribution G.',
    icon: groupIcon
  },
  {
    title: 'Delete',
    icon: trashIcon
  }
]

class MembersAccessRights extends Component {

  state = {
    checkedMembers: [],
    checkedNewMembers: []
  }

  componentWillMount() {
    const { getGrantAccessMembers, getGrandedAccessMembers } = this.props
    getGrandedAccessMembers()
    getGrantAccessMembers()
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

  renderDropDownItems = ({ label, enable, view_only }, index) => {
    return (
      <div className='acceess-rights__drop-down-row' key={index}>
        <div className='col-4'>
          <label>{label}</label>
        </div>
        <div className='col-4'>
          <div className='d-flex'>
            <input
              type='checkbox'
              id={`enable_${index}`}
              checked={enable}
              onChange={() => toogleUsersRights()}
            />
            <label htmlFor={`enable_${index}`} />
          </div>
        </div>
        <div className='col-4'>
          <div className='d-flex'>
            <input
              type='checkbox'
              id={`view_${index}`}
              checked={view_only}
              onChange={() => toogleUsersRights()}
            />
            <label htmlFor={`view_${index}`} />
          </div>
        </div>
      </div>
    )
  }

  renderDropDown = (btnTitle, columnTitle, values) => {
    return (
      <DropDown
        className='dropdown-with-switch'
        btnName={btnTitle}
        btnClass='btn btn-for-switch'
      >
        <div className='acceess-rights__drop-down'>
          <div className='acceess-rights__drop-down-row'>
            <div className='col-4'>
              <label>{columnTitle}</label>
            </div>
            <div className='col-4'>
              <label>Enable</label>
            </div>
            <div className='col-4'>
              <label>Disable</label>
            </div>
          </div>
          {/* TODO: There should be user.doucment_rights_attributes[0].document_field_value_ids.map((... */}
          {disciplineList.map((element, index) => (
            this.renderDropDownItems(element, index)
          ))}
        </div>
      </DropDown>
    )
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
                    <div className='user-and-conpany'>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                      <span className='text-secondary'>Company</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{`${user.first_name} Member id`}</span>
                  </Table.Cell>
                  <Table.Cell>
                    {this.renderDropDown('FOU', 'Originating company')}
                  </Table.Cell>
                  <Table.Cell>
                    {this.renderDropDown('HSE', 'Discipline')}
                  </Table.Cell>
                  <Table.Cell>
                    {this.renderDropDown('LOG', 'Document type')}
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
  getGrantAccessMembers: () => dispatch(getGrantAccessMembers()),
  getGrandedAccessMembers: () => dispatch(getGrandedAccessMembers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'members_access_rights_form'
})(MembersAccessRights))

