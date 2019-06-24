import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import NewModal from '../../../../../elements/Modal'
import plusIcon from '../../../../../images/add_1'
import InputField from '../../../../../elements/InputField'
import Tabs from '../../../../../elements/Tabs'

const columns = [
  { title: 'Name', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'E-mail', divider: true },
  { title: 'Company', divider: true },
]

const initState = {
  modalOpen: false,
  step: 1,
  checkedNewMembers: [],
  checkedCurrentMembers: []
}

class ModalTeamForm extends Component {

  state = {
    ...initState,
    newMembers: this.props.newMembers || [],
    currentMembers: this.props.oldMembers || [],
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    //const { destroyForm, discardInitialValues } = this.props
    this.setState({ ...initState })
    //destroyForm()
    //discardInitialValues()
  }

  handleStep = step => this.setState({ step })

  handleSubmit = (field, e) => {
    e.preventDefault()
    e.stopPropagation()
    // this.handleClose()
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

  renderModalTrigger = () => (
    <button
      className='ml-auto btn d-flex align-items-center with-icon'
      onClick={this.handleOpen}
    >
      <ReactSVG
        svgStyle={{ height: 15, width: 15, marginRight: 5 }}
        src={plusIcon}
        className='svg-icon'
      />
      <span>Create new Document</span>
    </button>
  )

  renderNameField = () => {
    return (
      <div className='modal-container__content-block'>
        <InputField
          type='text'
          name='team_title'
          id='team_title'
          placeholder='Team title'
          label='Type in team title'
        />
      </div>
    )
  }

  renderNewMembers = (type, users) => {
    const { column, direction } = this.state
    const checked = this.state[type]

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
                    <div><UserAvatar size='42' name={user.first_name} /></div>
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

  renderMembersTable = () => {
    const { grantAccess, checkedCurrentMembers, newMembers, checkedNewMembers } = this.state
    return (
      <Tabs>
        <div label='Add members'>{this.renderNewMembers('checkedNewMembers', newMembers)}</div>
        <div/>
        {/* <div label='Team members'>{this.currentMembers('currentMembers', currentMembers)}</div> */}
      </Tabs>
    )
  }

  renderFooter = () => {
    const { step } = this.state
    if (step === 1) {
      return (
        <div className='modal-footer justify-content-center'>
          <button
            type='button'
            className='btn btn-white'
            onClick={this.handleClose}
          >
            Close
          </button>
          <button
            type='button'
            className='btn btn-purple'
            onClick={() => this.handleStep(2)}
          >
            Next
          </button>
        </div>
      )
    } else if (step === 2) {
      const { checkedNewMembers, checkedCurrentMembers } = this.state
      let submitText = 'Add'
      if (checkedNewMembers.length && checkedCurrentMembers.length) {
        submitText = `Add ${checkedNewMembers.length} member(s) and remove ${checkedCurrentMembers.length} member(s)`
      } else if (checkedNewMembers.length) {
        submitText = `Add ${checkedNewMembers.length} member(s)`
      } else if (checkedCurrentMembers.length) {
        submitText = `Remove ${checkedCurrentMembers.length} member(s)`
      }
      return (
        <div className='modal-footer justify-content-center'>
          <button
            type='button'
            className='btn btn-white'
            onClick={() => this.handleStep(1)}
          >
            Back
          </button>
          <button type='button' className='btn btn-purple'>
            {submitText}
          </button>
          <button type='submit' className='btn btn-purple'>
            Change members list & redefine access rights
          </button>
        </div>
      )
    }
  }

  renderContent = () => {
    const { step } = this.state
    const { handleSubmit } = this.props

    return (
      <form onSubmit={e => handleSubmit(v => this.handleSubmit(v, e))()}>
        <div className='modal-container'>
          <div className='modal-container__title-block'>
            <h4>New team</h4>
          </div>
          {step === 1 && this.renderNameField()}
          {step === 2 && this.renderMembersTable()}          
        </div>
        {this.renderFooter()}
      </form>
    )
  }

  render() {
    const { modalOpen } = this.state

    return (
      <NewModal
        content={this.renderContent()}
        trigger={this.renderModalTrigger()}
        modalOpen={modalOpen}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = ({ accessRights }) => ({
  newMembers: accessRights.newMembers.users
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(reduxForm({ form: 'team_form' })(ModalTeamForm))