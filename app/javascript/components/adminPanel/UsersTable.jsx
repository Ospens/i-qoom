import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import { Link } from 'react-router-dom'

const tableData = [
  { name: 'Anna Danielson', member_id: 'ArandomnameTest12dsf345', employment: 2, access: { DMS: true } },
  { name: 'Anna Danielsson', member_id: 'ArandomnameTest12345', employment: 1, access: { DMS: true } }
]

const columns = [
  { title: 'Person', divider: false },
  { title: 'I-Qoom-ID', divider: true },
  { title: 'E-mail', divider: true },
  { title: 'Go to profile', divider: true },
  { title: 'Log into account', divider: true }
]
class UsersTable extends Component {

  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        // data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  renderAccessOptions = (label, modeleMaster, checked, member_id) => {
    const className = modeleMaster ? 'subitem' : 'mainitem'
    return (
      <a className={`dropdown-item blue-link ${className}`} href='#'>
        <span>{label}</span>
        <label className='switch ml-2'>
          <input type='checkbox' id={member_id} defaultChecked={checked} />
          <span className='slider round' />
        </label>
      </a>
    )
  }

  render() {
    const { column, data, direction } = this.state
    return (
      <div className='user-table-block'>
        <h3 className='mb-5'>Users - Choose member to observe</h3>
        <Table sortable className='main-table-block'>
          <Table.Header>
            <Table.Row>
              {columns.map(({ title, divider }) => (
                <Table.HeaderCell
                  sorted={column === title ? direction : null}
                  onClick={this.handleSort(title)}
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
                <Table.Cell className='name-column user-info-avatar d-flex'>
                  <button type='button' className='nav-link btn-transparent user-info-avatar'>
                    <UserAvatar size='42' name='Anna Danielsson' />
                  </button>
                  <div className='user-and-company'>
                    <span>{name}</span>
                    <span className='text-secondary'>Company</span>
                  </div>
                </Table.Cell>
                <Table.Cell className='member-id'><span>{member_id}</span></Table.Cell>
                <Table.Cell>
                  <a href='#' className='blue-link'>test@gmail.xyz</a>
                </Table.Cell>
                <Table.Cell>
                  <Link to='/admin_panel/users/1'>Go to</Link>
                </Table.Cell>
                <Table.Cell>
                  <a href='#' className='blue-link'>Log in</a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default UsersTable