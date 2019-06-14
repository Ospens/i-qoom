import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  SubmissionError,
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field,
  destroy
} from 'redux-form'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import Tabs from '../../../../../elements/Tabs'
import { startAddInputRights } from '../../../../../actions/conventionActions'

const columns = [
  { title: 'Name', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'E-mail', divider: true },
  { title: 'Role', divider: true },
]

const tableData = [
  { name: 'Anna', member_id: 'FyteTest12dsf345', employment: 2 },
  { name: 'Anna Danielson', member_id: 'ArandomnameTest12345', employment: 1 }
]

class ModalLimitAccess extends Component {

  state = {
    column: null,
    data: tableData,
    direction: null,
    grantAccess: [],
    grandedAccess: []
  }

  componentWillMount() {
    const { startAddInputRights } = this.props
    startAddInputRights()
  }

  handleCheckUser = (value, type) => {
    const values = this.state[type] || []

    const indexElement = values.indexOf(value)
    if (indexElement > -1) {
      values.splice(indexElement, 1)
    } else {
      values.push(value)
    }

    this.setState({ [type]: values })
  }

  renderGrantAccess = (type) => {
    const { column, data, direction } = this.state
    const checked = this.state[type]

    return (
      <div className="modal-container__content-block">
        <div className="d-flex mb-4">
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
          <Table sortable className='mamber-managment-table'>
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
              {data.map(({ member_id, name, employment }) => (
                <Table.Row key={name}>
                  <Table.Cell className='table-checkbox'>
                    <div>
                      <input
                        type='checkbox'
                        id={member_id}
                        checked={checked.includes(member_id)}
                        onChange={() => this.handleCheckUser(member_id, type)}
                      />
                      <label htmlFor={member_id} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className='name-column'>
                    <div>
                      <UserAvatar size='24' name={name} />
                    </div>
                    <div className='ml-2'>
                      <span>{name}</span>
                      <div>
                        <label>test</label>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className='member-id'><span>{member_id}</span></Table.Cell>
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
    const { handleBack } = this.props
    handleBack()
  }

  render() {
    const { handleClose, handleBack, title, handleSubmit } = this.props
    const { grantAccess, grandedAccess } = this.state
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
        className='modal-limit-access-form'
        onSubmit={e => handleSubmit(v => this.handleSubmit(v, e))()}
      >
        <div className='modal-container'>
          <div className="modal-container__title-block">
            <div>
              <h4>Limit access to input field</h4>
              <span>{title || 'New input field'}</span>
            </div>
            <div className="info-block">
              <p>No member selected everyone has access</p>
              <p>One member selected: no one except one has access</p>
            </div>
          </div>
          <Tabs>
            <div label='Grant access'>{this.renderGrantAccess('grantAccess')}</div>
            <div label='Granded access'>{this.renderGrantAccess('grandedAccess')}</div>
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

const mapStateToProps = state => ({ })

const mapDispatchToProps = dispatch => ({
  startAddInputRights: () => dispatch(startAddInputRights())
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({
  form: 'input_access_rights_form',
  enableReinitialize: true
})(ModalLimitAccess))
