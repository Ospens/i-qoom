import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import Select from 'react-select'
import UserAvatar from 'react-user-avatar'

const tableData = [
  { name: 'Anna Danielson', member_id: 'ArandomnameTest12345', employment: 2 },
  { name: 'Anna Danielsson', member_id: 'ArandomnameTest12345', employment: 1 }
]

const columns = [
  { title: 'Person', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'Employment', divider: true },
  { title: 'Role', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Module access', divider: true }
]

const accessOptions = [
  {
    label: 'Contract MS',
    options: [
      {
        label: 'Module master',
        value: 'Module master'
      }
    ],
    label: 'Document MS',
    options: [
      {
        label: 'Module master',
        value: 'Module master'
      }
    ],
  }
]
const emplOptions = [
  { value: 'Employee', label: 'Employee' },
  { value: 'Internal contractor', label: 'Internal contractor' },
  { value: 'External contractor', label: 'External contractor' }
]

const roleOptions = [
  { value: 'Designer', label: 'Designer' },
  { value: 'Electrian', label: 'Electrian' },
  { value: 'Certifier', label: 'Certifier' },
  { value: 'Other', label: 'Other' }
]

const discOptions = [
  { value: 'Design', label: 'Design' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Certification', label: 'Certification' }
]

const minHeight = '30px'
const height = '30px'

const colourStyles = {
  control: styles => ({ ...styles, minHeight, height })
}

class MemberTable extends Component {

  state = {
    tab: 1,
    column: null,
    data: tableData,
    direction: null,
  }
  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state
    return (
      <div className='table-block'>
        <Table sortable className='mamber-managment-table'>
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
                <Table.Cell className='name-column'>
                  <UserAvatar size='24' name={name} />
                  {name}
                </Table.Cell>
                <Table.Cell className='member-id'><span>{member_id}</span></Table.Cell>
                <Table.Cell>
                  <Select
                    styles={colourStyles}
                    onChange={this.handleChange}
                    options={emplOptions}
                    defaultValue={emplOptions[employment]}
                    autoFocus={false}
                    maxMenuHeight='110'
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell>
                  <Select
                    styles={colourStyles}
                    onChange={this.handleChange}
                    options={roleOptions}
                    defaultValue={roleOptions[employment]}
                    autoFocus={false}
                    maxMenuHeight='110'
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell>
                  <Select
                    styles={colourStyles}
                    onChange={this.handleChange}
                    options={discOptions}
                    defaultValue={discOptions[employment]}
                    autoFocus={false}
                    maxMenuHeight='110'
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell>
                  <Select
                    styles={colourStyles}
                    onChange={this.handleChange}
                    options={accessOptions}
                    defaultValue={accessOptions[employment]}
                    autoFocus={false}
                    maxMenuHeight='110'
                    className='form-control-select'
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
 
export default MemberTable