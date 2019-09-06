import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import Tabs from '../../../../../elements/Tabs'

const columns = [
  { title: 'Name', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'E-mail', divider: true },
  { title: 'Company', divider: true },
]

class ModalLimitAccess extends Component {

  state = {
    column: null,
    newMembers: this.props.newMembers || [],
    oldMembers: this.props.oldMembers || [],
    direction: null,
    grantAccess: [],
    grandedAccess: []
  }

  handleCheckUser = (value, type) => {
    const values = this.state[type] || []
    const { change } = this.props
    const indexElement = values.indexOf(value)
    if (indexElement > -1) {
      values.splice(indexElement, 1)
    } else {
      values.push(value)
    }

    this.setState({ [type]: values })
    change([type], values)
  }

  renderGrantAccess = (type, users) => {
    const { column, direction } = this.state
    const checked = this.state[type]
    // TODO: now this users list is only for all fields

    return (
      <div className='modal-container__content-block'>
        <div className='d-flex mb-4'>
          <label className='m-0'>
            Select members and add them to granted access list
          </label>
          <button
            type='button'
            className='btn color-blue p-0 ml-auto'
          >
            Copy members from distribution group
          </button>
        </div>
        <div className='table-block'>
          <Table sortable className='main-table-block'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className='table-checkbox'>
                  <div>
                    <input type='checkbox' id='check_all' />
                    <label htmlFor='check_all'></label>
                  </div>
                </Table.HeaderCell>

                {columns.map(({ title, divider }) => (
                  <Table.HeaderCell
                    sorted={column === title ? direction : null}
                    /*onClick={this.handleSort(title)}*/
                    key={title}
                  >
                    {divider && <span className='divider' />}
                    <span>{title}</span>
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user, i) => (
                <Table.Row key={i}>
                  <Table.Cell className='table-checkbox'>
                    <div>
                      <input
                        type='checkbox'
                        id={user.id}
                        checked={checked.includes(user.id)}
                        onChange={() => this.handleCheckUser(user.id, type)}
                      />
                      <label htmlFor={user.id} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className='name-column'>
                    <div><UserAvatar size='24' name={user.first_name} /></div>
                    <div className='ml-2'>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                      <div><label>Company</label></div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className='member-id'>
                    <span>{`${user.username}_${user.id}`}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{user.email}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span>{`Comapny: ${user.first_name}`}</span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </ Table.Body>
          </Table>
        </div>
      </div>
    )
  }

  handleSubmit = (field, e) => {
    e.preventDefault()
    e.stopPropagation()
    const { handleBack, startUpdateAccessMembers } = this.props
    handleBack()
  }

  render() {
    const { handleClose, handleBack, title, handleSubmit } = this.props
    const { grantAccess, grandedAccess, newMembers, oldMembers } = this.state
    let submitText = 'Add'
    if (grantAccess.length && grandedAccess.length) {
      submitText = `Add ${grantAccess.length} member(s) and remove ${grandedAccess.length} member(s)`
    } else if (grantAccess.length) {
      submitText = `Add ${grantAccess.length} member(s)`
    } else if (grandedAccess.length) {
      submitText = `Remove ${grandedAccess.length} member(s)`
    }

    return (
      <form
        noValidate={true} 
        className='modal-limit-access-form'
        onSubmit={e => handleSubmit(v => this.handleSubmit(v, e))()}
      >
        <div className='modal-container'>
          <div className='modal-container__title-block'>
            <div>
              <h4>Limit access to input field</h4>
              <span>{title || 'New input field'}</span>
            </div>
            <div className='info-block'>
              <p>No member selected everyone has access</p>
              <p>One member selected: no one except one has access</p>
            </div>
          </div>
          <Tabs>
            <div label='Grant access'>{this.renderGrantAccess('grantAccess', newMembers)}</div>
            <div label='Granded access'>{this.renderGrantAccess('grandedAccess', oldMembers)}</div>
          </Tabs>
        </div>
        <div className='modal-footer justify-content-center'>
          <button
            type='button'
            className='btn btn-white'
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type='button'
            className='btn btn-white'
            onClick={handleBack}
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-purple'>
            {submitText}
          </button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ accessRights }) => ({
  newMembers: accessRights.newMembers.users,
  oldMembers: accessRights.oldMembers.users
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({form: 'input_access_rights_form'})(ModalLimitAccess))
