import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../elements/DropDown'
import { SelectComponent } from '../../../../elements/SelectField'
import { startUpdateProjectMember } from '../../../../actions/projectMembersActions'

const tableData = [
  { name: 'Anna Danielson', member_id: 'ArandomnameTest12dsf345', employment: 2, access: { DMS: true } },
  { name: 'Anna Danielsson', member_id: 'ArandomnameTest12345', employment: 1, access: { DMS: true } }
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
    modulemaster: true
  },
  {
    label: 'Document MS',
    modulemaster: true
  }
]

const emplOptions = [
  { value: 0, title: 'Employee' },
  { value: 1, title: 'Internal contractor' },
  { value: 2, title: 'External contractor' }
]

const roleOptions = [
  { value: 0, title: 'Designer' },
  { value: 1, title: 'Electrian' },
  { value: 2, title: 'Certifier' }
]

const discOptions = [
  { value: 1, title: 'Design' },
  { value: 2, title: 'Electrical' },
  { value: 3, title: 'Certification' }
]

class MemberTable extends Component {

  state = {
    tab: 1,
    column: null,
    data: tableData,
    direction: null,
  }

  handleChange = (values, id, type) => {
    const { startUpdateProjectMember, projectId } = this.props
    const v = {
      id,
      [type]: values.value
    }
    startUpdateProjectMember(v, projectId)
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        // data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  renderAccessOptions = (label, modeleMaster, checked, member_id) => {
    const className = modeleMaster ? 'subitem' : 'mainitem'
    return (
      <a className={`dropdown-item ${className}`} href='#'>
        <span>{label}</span>
        <label className='switch ml-2'>
          <input type='checkbox' id={member_id} defaultChecked={checked}/>
          <span className='slider round' />
        </label>
      </a>
    )
  }

  render() {
    const { column, direction } = this.state
    const { members } = this.props

    return (
      <div className='table-block'>
        <Table sortable className='main-table-block'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className='table-checkbox'>
                <div>
                  <input
                    type='checkbox'
                    id='check_all'
                  />
                  <label htmlFor='check_all'></label>
                </div>
              </Table.HeaderCell>
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
            {members.map(({ id, first_name, last_name, employment }) => (
              <Table.Row key={id}>
                <Table.Cell className='table-checkbox'>
                  <div>
                    <input type='checkbox' id={id} />
                    <label htmlFor={id}></label>
                  </div>
                </Table.Cell>
                <Table.Cell className='name-column'>
                  <div>
                    <UserAvatar size='42' name={`${first_name} ${last_name}`} />
                    <span className='master-icon'>M</span>
                  </div>
                  <div>
                    <div>{first_name}</div>
                    <div>{last_name}</div>
                  </div>
                </Table.Cell>
                <Table.Cell className='member-id'>
                  <span>{`${first_name}${last_name}`}</span>
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='employment_type'
                    name='employment_type'
                    onChange={val => this.handleChange(val, id, 'employment_type')}
                    options={emplOptions}
                    defaultValue={emplOptions[0]}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='company_type'
                    name='company_type'
                    onChange={this.handleChange}
                    options={roleOptions}
                    defaultValue={roleOptions[0]}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='discipline'
                    name='discipline'
                    onChange={this.handleChange}
                    options={discOptions}
                    defaultValue={discOptions[0]}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='access-column'>
                  <DropDown
                    className='dropdown-with-switch'
                    btnName='DMS, CMS'
                    btnClass='btn btn-for-switch'
                  >
                    {accessOptions.map(({ label, modulemaster }) => {
                      return (
                        <React.Fragment key={label}>
                          {this.renderAccessOptions(label, false, true, id)}
                          {modulemaster && this.renderAccessOptions('Module master', true, false, id)}
                        </React.Fragment>
                      )
                    })}
                  </DropDown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startUpdateProjectMember: (values, projectId) => dispatch(startUpdateProjectMember(values, projectId))
})

const mapStateToProps = state => ({
  members: state.projectMembers.members
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberTable)
