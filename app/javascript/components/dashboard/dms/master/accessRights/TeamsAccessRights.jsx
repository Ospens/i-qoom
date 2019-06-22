import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import ReactSVG from 'react-svg'
import UserAvatar from 'react-user-avatar'
import { Popup } from 'semantic-ui-react'
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
import trashIcon from '../../../../../images/trash_bucket'
import plusIcon from '../../../../../images/add_1'
import ShowMembersPopup from './ShowMembersPopup'

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
    title: 'Edit team / add members',
    icon: accessRightsIcon
  },
  {
    title: 'Copy DG-members to team',
    icon: showProfileIcon
  },
  {
    title: 'Synchronize with distribution group',
    icon: messageIcon
  },
  {
    title: 'Delete teams',
    icon: trashIcon
  }
]

class TeamsAccessRights extends Component {

  state = {
    checkedTeams: [],
    checkedNewTeams: [],
    showMore: false
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

  renderShowMembersButton = () => {
    const { showMore } = this.state
    return (
      <Popup
        trigger={
          <button type='button' className='btn ml-auto' onClick={() => this.setState({ showMore: false })}>Show members</button>
        }
        on='click'
      >
        <div className='tooltip-block'>
          <div className='show-members-popup'>
            <ReactSVG
              svgStyle={{ height: 25, width: 25, marginRight: 10 }}
              src={plusIcon}
              className='popup-add-team-member'
            />
            {!showMore &&
              <React.Fragment>
                <div className="popup-team-member-list">
                  {[...Array(3)].map((el, i) => (
                    <UserAvatar size='42' name={`${i}${i}`} key={i} />
                  ))}
                  </div>
                <button
                  type='button'
                  className='btn popup-toggle-members-btn shower btn-white-blue'
                  onClick={() => this.setState({ showMore: true })}
                  >
                    Show 12 more
                </button>
              </React.Fragment>
            }
            {showMore &&
              <React.Fragment>
                <div className="popup-team-member-list">
                  {[...Array(15)].map((el, i) => (
                    <UserAvatar size='42' name={`${i}${i}`} key={i} />
                  ))}
                  </div>
                  <button
                    type='button'
                    className='btn popup-toggle-members-btn hider btn-white-blue'
                    onClick={() => this.setState({ showMore: false })}
                  >
                    Show less
                </button>
              </React.Fragment>
            }
          </div>
          {/*<div className='show-members-popup'>
            {[...Array(15)].map((el, i) => (
              <UserAvatar size='42' name={`${i}${i}`} key={i} />
            ))}
            </div>*/}
        </div>
      </Popup>
    )
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
      optionsText += `: ${checked.length} teams selected`
    }

    return (
      <React.Fragment>
        <div><label>Select Access rights for teams</label></div>
        <div className='d-flex my-4'>
          <DropDown btnName={optionsText}>
            {optionBtn.map(({ title, icon }, i) => (
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
                  <Table.Cell className='team-title-column user-info-avatar d-flex'>
                    <div className='user-info-avatar'>
                      <div className='team-icon'>
                        <UserAvatar size='42' name='T' />
                      </div>
                    </div>
                    <div className='user-and-conpany'>
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
        content={this.renderContent()}
      />
    )
  }
}
const mapStateToProps = ({ accessRights }) => ({
  // TODO: change it for teams
  newTeams: accessRights.newMembers.users,
  oldTeams: accessRights.oldMembers.users
})

const mapDispatchToProps = dispatch => ({
  // TODO: change it for teams
  getGrantAccessMembers: () => dispatch(getGrantAccessMembers()),
  getGrandedAccessMembers: () => dispatch(getGrandedAccessMembers())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'team_access_rights_form'
})(TeamsAccessRights))

